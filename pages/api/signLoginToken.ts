// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DisadusLMSTypes, DisadusTypes } from "@Disadus/disadus-plugin-api";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { APIDOMAIN, DISADUSAPI } from "../../Helpers/constants";
dotenv.config();
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
          'Content-Type': 'application/json',
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
  if (token.status !== 200)
    return res.status(401).send({
      error: "Invalid token",
    });
  const tokenData = await token.text();
  return res.status(200).send({
    token: tokenData,
  });
}
