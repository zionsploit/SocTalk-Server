export default {
    addAccountQuery: 'INSERT INTO accounttb (firstName, middleName, lastName, birthday, username, password) VALUES (@firstName, @middleName, @lastName, @birthday, @username, @password)',
    getDataQuery: 'SELECT * from accounttb order by id desc'
}