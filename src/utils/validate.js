import {Toast} from "antd-mobile";

export function validateForm(form,rules) {
    console.log(form," validate")
    for (let rule of rules){
        if (rule.required == true){
            for (let key in form){
                if (rule.label == key && !form[key]){
                    Toast.info(rule.msg, 1);
                    return false;
                }
            }
        }
    }
    return true;
}