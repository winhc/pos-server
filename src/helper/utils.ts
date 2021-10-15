const bcrypt = require('bcrypt');
import * as moment from 'moment';

export const comparePasswords = async (userPassword, currentPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
};

export const formattedDate = (date) => {
    // console.log(`formattedDate=> ${date}`)
    // console.log(`formattedDate newDate=> ${new Date(date)}`)
    // console.log(`formattedDate getDate=> ${new Date(date).getDate()}`)
    // console.log(`formattedDate toLocaleDateString=> ${new Date(date).toLocaleDateString()}`)
    // console.log(`formattedDate now=> ${new Date().getDate()}`)
    return moment(new Date(date)).format('YYYY-MM-DD');
}