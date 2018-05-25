import {UserTestPK} from "./UserTestPK";
import {Test} from "./Test";

export class UserTest {
  userTestPK: UserTestPK;

  elapsedTime: number;
  timeLimit: number;
  testScore: number;
  nbCorrectAnswers: number;
test:Test;
//nbTotalQuestions;
  constructor(data: any) {
    this.userTestPK = data.userTestPK;
    this.elapsedTime = data.elapsedTime;
    this.timeLimit = data.timeLimit;
    this.testScore = data.testScore;
    this.nbCorrectAnswers = data.nbCorrectAnswers;


  }

}
