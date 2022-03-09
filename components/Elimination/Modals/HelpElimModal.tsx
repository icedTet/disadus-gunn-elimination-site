import { useEffect, useRef } from "react";
import { EliminationUserData } from "../../../Types/EliminationTypes";
import { Modal } from "../../Utils/Modal";
import QRCode from "qrcode";
import { ShieldExclamationIcon } from "@heroicons/react/outline";
export const HelpElimModal = (props: {
  userData: EliminationUserData | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { userData, open, setOpen } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    userData?.secret &&
      open &&
      setTimeout(() => {
        QRCode.toCanvas(canvasRef.current!, userData.secret, {
          margin: 1,
          width: 192,
        });
      }, 10);
  }, [userData, open]);
  return (
    <Modal
      visible={open}
      onClose={() => setOpen(false)}
      title="Kill Code"
      hideBG
    >
      <div
        className={`w-160 h-128 max-w-[95vw] md:w-screen md:h-144 max-h-screen rounded-xl dark:bg-gray-700 bg-white flex flex-col p-8 gap-4 dark:text-gray-200 text-gray-900 drop-shadow-sm overflow-auto`}
      >
        <div
          className={`w-full h-20 flex flex-col justify-start items-center gap-4`}
        >
          <div className="prose-sm prose box max-w-none dark:prose-invert">
            <h2 className="mb-3 text-lg font-semibold">How To Play</h2>
            <summary>
              At the beginning of the game (3/1/22 12AM), each player will be
              assigned another player (target). Your mission is to eliminate
              your target by tagging them with a miniature stuffed plushie.
              After you eliminate your first target, you will get assigned your
              target&apos;s target. Eliminations are only valid under certain
              circumstances (see below). The game will end on 3/31 11:59 PM and
              whoever has the most eliminations by then wins!
            </summary>
            <h2 className="mb-3 text-lg font-semibold">Rules</h2>
            <details>
              <summary className={"cursor-pointer"}>
                Click to expand rules
              </summary>
              <ol>
                <li>The plushie MUST be visible at all times </li>
                <li>
                  You cannot be eliminated during a class period when you are
                  marked present to that class and the bell has rung.
                </li>
                <li>
                  You are still safe if you exit the class (e.g. going to the
                  bathroom)
                </li>
                <li>You are not safe during a prep period</li>
                <li>You can tag in a classroom before or after class</li>
                <li>
                  If a teacher wants absolutely no elimination in their
                  classroom you must obey their wish. Teachers can report
                  students, and you will be disqualified.{" "}
                </li>
                <li>You cannot be eliminated while you are playing a sport</li>
                <li>
                  This includes sports not affiliated with Gunn (i.e. playing
                  basketball or working out)
                </li>
                <li>
                  You cannot be eliminated until after you have exited the
                  athletic facility.{" "}
                </li>
                <li>You are safe while in the locker room</li>
                <li>You cannot be eliminated in the shower or in a stall</li>
                <li>
                  You cannot be eliminated while driving a car or riding a bike
                </li>
                <li>
                  You cannot be eliminated during Prime and while checked into a
                  classroom or marked present, even if you are going to the
                  bathroom.
                </li>
                <li>
                  You cannot be eliminated while making up work for a teacher,
                  even if not during Office Hours/Prime or class times.
                </li>
                <li>You cannot be eliminated in the TRC</li>
                <li>You can be eliminated while tutoring in the AC</li>
                <li>
                  You cannot be eliminated while performing school-related
                  after-school activities (i.e. theater, GRT etc.). If you leave
                  to go to the bathroom, etc. you are still safe
                </li>
                <li>This also includes a school dance</li>
                <li>
                  You cannot be eliminated while participating in any
                  extracurricular activities (including rehearsals,
                  performances, classes, competitions, or practices). You are
                  safe until the venue is entirely over. You can be tagged
                  before the extracurricular starts or after it ends.{" "}
                </li>
                <li>
                  You are safe when you are working (if you have a part-time
                  job)
                </li>
                <li>You can be eliminated during a lunchtime club. </li>
                <li>
                  Any participants and performers in a lunchtime rally are safe
                  for the entire duration of the rally.
                </li>
                <li>
                  If you are in the audience, you can be eliminated at the
                  rally.
                </li>
                <li>
                  You cannot throw the plushie in order to tag someone; you must
                  tap the other person lightly
                </li>
                <li>You cannot own more than one plushie</li>
                <li>
                  You cannot be eliminated while you are taking any type of
                  school related assessments
                </li>
                <li>You cannot steal each other’s plushie</li>
                <li>
                  You are not allowed to be tagged after having the plushie
                  taken from you by force. If you have given the plushie to
                  someone else by choice, you can be tagged
                </li>
                <li>You can get eliminated after school and on the weekends</li>
                <li>
                  After you eliminate someone, enter the target’s pin number
                  into the site to receive your next target
                </li>
                <li>
                  You cannot tie the plushie to your hand or attach anything to
                  the plushie
                </li>
                <li>
                  Rules will change and become more intense over the course of
                  the game
                </li>
                <li>NO BREAKING THE LAW</li>
                <li>
                  AS OF MIDNIGHT 03/01/2022 - Players must hold the plushie and
                  the game begins!
                </li>
              </ol>
            </details>

            <details>
              <summary className="cursor-pointer">
                Click to expand Immunity Calendar
              </summary>
              <table>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <strong>1 GAME STARTS</strong>
                      <br />
                      Players must be holding the animal in their <u>
                        RIGHT
                      </u>{" "}
                      hand
                    </td>
                    <td>
                      <strong>2</strong>
                      <br />
                      Players must be holding the animal in their <u>
                        LEFT
                      </u>{" "}
                      hand
                    </td>
                    <td>
                      <strong>3</strong>
                      <br />
                      Players must be holding the animal in their <u>
                        RIGHT
                      </u>{" "}
                      hand
                    </td>
                    <td>
                      <strong>4</strong>
                      <br />
                      Players must be holding the animal in their <u>
                        LEFT
                      </u>{" "}
                      hand
                    </td>
                    <td>
                      <strong>5</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        6<br />
                        Targets Change
                        <br />8 PM
                      </strong>
                    </td>
                    <td>
                      <strong>7</strong>
                      <br />
                      Players must be holding the animal with both hands
                    </td>
                    <td>
                      <strong>8</strong>
                      <br />
                      Players must tape/attach the animal to their arm
                    </td>
                    <td>
                      <strong>9</strong>
                      <br />
                      Targets Change
                      <br />8 PM
                    </td>
                    <td>
                      <strong>10</strong>
                      <br />
                      Players must be holding animal <u>ABOVE</u> their shoulder
                    </td>
                    <td>
                      <strong>11</strong>
                      <br />
                      Players must be holding animal <u>BELOW</u> waist
                    </td>
                    <td>
                      <strong>12</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        13
                        <br />
                        Targets Change
                        <br />8 PM
                      </strong>
                    </td>
                    <td>
                      <strong>14</strong>
                      <br />
                      Players must be (visibly) wearing <u>RED</u>
                    </td>
                    <td>
                      <strong>15</strong>
                      <br />
                      Players must be (visibly) wearing <u>PINK</u>
                    </td>
                    <td>
                      <strong>16</strong>
                      <br />
                      Targets Change
                      <br />8 PM
                    </td>
                    <td>
                      <strong>17</strong>
                      <br />
                      (St. Patricks Day) Players must (visibly) wear{" "}
                      <u>GREEN</u>
                    </td>
                    <td>
                      <strong>18</strong>
                      <br />
                      Players must be (visibly) wearing <u>ORANGE</u>
                    </td>
                    <td>
                      <strong>19</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        20
                        <br />
                        Targets Change
                        <br />8 PM
                      </strong>
                    </td>
                    <td>
                      <strong>21</strong>
                      <br />
                      Players must be under a roof or overhang
                    </td>
                    <td>
                      <strong>22</strong>
                      <br />
                      Players must be holding the animal with both hands
                    </td>
                    <td>
                      <strong>23</strong>
                      <br />
                      Targets Change
                      <br />8 PM
                    </td>
                    <td>
                      <strong>24</strong>
                      <br />
                      Players animal must be touching their shoulder
                    </td>
                    <td>
                      <strong>25</strong>
                      <br />
                      Players must be (visibly) wearing a <u>HAT</u>
                    </td>
                    <td>
                      <strong>26</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        27
                        <br />
                        Targets Change
                        <br />8 PM
                      </strong>
                    </td>
                    <td>
                      <strong>28</strong>
                      <br />
                      Players animal must be touching their shoulder
                    </td>
                    <td>
                      <strong>29</strong>
                      <br />
                      layers must be (visibly) wearing a <u>HAT</u>
                    </td>
                    <td>
                      <strong>30</strong>
                      <br />
                      Players must be touching any wall w/animal
                      <br />
                      (no poles)
                    </td>
                    <td>
                      <strong>31</strong>
                      <br />
                      NO ONE IS SAFE (can be tagged anytime even w/animal)
                    </td>
                    <td>
                      <strong>
                        <br />
                        31st 11:59 is when GAME ENDS
                      </strong>
                    </td>
                    <td>
                      <strong>
                        The player with the most people eliminated and is still
                        alive WINS
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </details>
          </div>
        </div>
      </div>
    </Modal>
  );
};
