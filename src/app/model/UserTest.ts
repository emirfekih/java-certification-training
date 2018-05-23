import {UserTestPK} from "./UserTestPK";

export class UserTest {
  userTestPK: UserTestPK;
  testDate: any;
  elapsedTime: number;
  timeLimit: number;
  testScore: number;
  nbCorrectAnswers: number;

//nbTotalQuestions;
  constructor(data: any) {
    this.userTestPK = data.userTestPK;
    this.testDate = data.date;
    this.elapsedTime = data.elapsedTime;
    this.timeLimit = data.timeLimit;
    this.testScore = data.testScore;
    this.nbCorrectAnswers = data.nbCorrectAnswers;


  }

}
