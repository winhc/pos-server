const bcrypt = require('bcrypt');
import * as moment from 'moment';

export const comparePasswords = async (userPassword, currentPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
};

export const formattedDate = (date) => {
    return moment(new Date(date)).format('YYYY-MM-DD');
}