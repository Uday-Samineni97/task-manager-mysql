const database = require("../../config/db/db_config");

exports.register = (req, result) => {
  const insert_data = [
    {
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone
    }
  ];

  database.query("INSERT into user set ?", insert_data, (error, data) => {
    if (error) {
      result(error, null);
    } else {
      result(null, data);
    }
  });
};

exports.login = (req, result) => {
  database.query(
    "select * from user where email = ?",
    [req.body.email],
    (error, data) => {
      if (error) {
        result(error, null);
      } else {
        result(null, data);
      }
    }
  );
};
