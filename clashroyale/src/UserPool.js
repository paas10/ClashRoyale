import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = { 
    UserPoolId: "us-east-2_MK4Mi8OjM",
    ClientId: "22olebmtpdosogrcijlh5dbnqc"
}

export default new CognitoUserPool(poolData);