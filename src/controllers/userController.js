// const User = require('../models/user');
// const Food = require('../models/food');
// const Food_Type = require('../models/food_type');
const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');

// các hàm xử lý chức năng ở BE chứa trong thư mục controllers

//R => GET
const getUser = async (req, res) => {
    try {
        let data = await model.user.findAll();
        // res.status(200).send(data);
        sucessCode(res, data, "Lấy dữ liệu thành cộng")
    } catch (err) {
        // res.status(500).send("Lỗi Back end");
        errorCode(res, "Lỗi Backend")
    }

}
//C => POST
const createUser = async (req, res) => {
    try {
        let { full_name, email, passWord } = req.body;

        // C1 : trả về danh sách => []
        // .filter()
        let checkEmail = await model.user.findAll({
            where: {
                email
            }
        })
        //C2 : trả về object => {}
        //. find()
        let checkEmailObj = await User.findOne({
            where: {
                email
            }
        });

        // if(checkEmail.length > 0){
        if (checkEmailObj) {
            // res.status(400).send("Email đã tồn tại");
            failCode(res, { full_name, email, passWord }, "Email đã tồn tại !")
        } else {
            let result = await model.user.create({
                full_name,
                email,
                passWord
            });

            // res.status(200).send(result);
            sucessCode(res,result,"Tạo mới thành công !")
        }

    } catch (err) {
        // res.status(500).send("Lỗi Backend");
        errorCode(res,"Lỗi Backend")
    }

}
//U => PUT
const updateUser = async (req, res) => {
    try {
        let { user_id } = req.params;
        let { full_name, email, passWord } = req.body;

        let checkUser = await model.user.findOne({
            where: {
                user_id
            }
        });

        // if(checkEmail.length > 0){
        if (checkUser) {
            await User.update({
                full_name,
                email,
                passWord
            }, {
                where: {
                    user_id
                }
            });

            // res.status(200).send("Update thành công !");
            sucessCode(res,checkUser,"Update thành công");
        } else {
            // res.status(400).send("User không tồn tại");
            failCode(res,user_id ,"User không tồn tại !");
        }

    } catch (err) {
        // res.status(500).send("lỗi Backend");
        errorCode(res,"Lỗi Backend")
    }
}
//D => .destroy()



//commonjs module
module.exports = {
    getUser,
    createUser,
    updateUser
}