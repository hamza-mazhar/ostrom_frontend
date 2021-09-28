import moment from "moment";

const Formatdate = (text: any) => moment(text).format('MM/DD/YYYY');

export {Formatdate}
