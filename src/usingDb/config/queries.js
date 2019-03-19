const queries={};
queries.insertUsers ='INSERT INTO users(firstName,lastName,country,phoneNumber,gender,email,password) VALUES($1,$2,$3,$4,$5,$6,$7)'
queries.checkIfUserExist ='SELECT * FROM users where email = $1'

export default queries