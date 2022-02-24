// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DisadusLMSTypes, DisadusTypes } from "@Disadus/disadus-plugin-api";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { APIDOMAIN, DISADUSAPI } from "../../Helpers/constants";
type Data = {
  error?: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const DisadusToken = req.headers.authorization;
  if (!DisadusToken)
    return res.status(401).send({
      error: "No token provided",
    });
  const self = await fetch(`${DISADUSAPI}/user/@me`, {
    headers: {
      Authorization: DisadusToken,
    },
  });
  if (self.status !== 200)
    return res.status(401).send({
      error: "Invalid Disadus token",
    });
  const selfData = (await self.json()) as DisadusTypes.User;
  let email = "";
  if (!selfData.email.match(/@pausd.us/)) {
    const lmsUser = await fetch(
      `${DISADUSAPI}/community/${selfData.primaryCommunity}/LMS/@me`,
      {
        headers: {
          Authorization: DisadusToken,
          "Content-Type": "application/json",
        },
      }
    );
    if (lmsUser.status !== 200) {
      return res.status(401).send({
        error: "Invalid LMS token",
      });
    }
    const lmsUserData = (await lmsUser.json()) as DisadusLMSTypes.SchoologySelf;
    email = lmsUserData.email;
  } else {
    email = selfData.email;
  }
  if (!email) return res.status(401).send({ error: "Invalid token" });
  console.warn("Debug",process.env.ELIM_KEY)
  const token = await fetch(`${APIDOMAIN}/login`, {
    headers: {
      Authorization: process.env.ELIM_KEY!,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
  const userID = email.split("@")[0].toUpperCase();
  if (token.status !== 200) {
    console.warn(token.status, process.env, process.env.ELIM_KEY);
    console.warn(await token.text());
    if (token.status === 469) {
      //user not found, create user
      const createUser = await fetch(`${APIDOMAIN}/createUser`, {
        headers: {
          Authorization: process.env.ELIM_KEY!,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userID,
          username: selfData.username,
          firstName: selfData.firstName,
          lastName: selfData.lastName,
          email,
          admin: false,
          pfp: selfData.pfp,
          password: "disadoos",
        }),
      });
      if (createUser.status !== 200) {
        return res.status(401).send({
          error: "Create user failed",
        });
      }
      let newToken = await fetch(`${APIDOMAIN}/login`, {
        headers: {
          Authorization: process.env.ELIM_KEY!,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });
      if (newToken.status !== 200) {
        return res.status(401).send({
          error: "Create user + login failed",
        });
      }
      const tokenData = await newToken.text();
      return res.status(200).send({
        token: tokenData,
      });
    }
    return res.status(401).send({
      error: "Invalid token",
    });
  }
  const tokenData = await token.text();
  return res.status(200).send({
    token: tokenData,
  });
}
