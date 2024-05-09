const Sequelize = require("sequelize");

//model routes
const SignUpDB = require("./login/UserSignUpModels");
const RegisDB = require("./Manager/RegistrarionModels");

//db 연결 정보 가져오기
const { ExdbConfig } = require("../config/config");

//db 및 모델 저장
const database = {};

//db에 대한 연결 설정
const Node_db = new Sequelize(
    ExdbConfig.database,
    ExdbConfig.user,
    ExdbConfig.password,
    ExdbConfig
);

database.Sequelize = Sequelize;
database.Node_db = Node_db;

//함수 호출 및 반환
database.SignUpDB = SignUpDB(Node_db, Sequelize);
database.RegisDB = RegisDB(Node_db, Sequelize);

module.exports = database;