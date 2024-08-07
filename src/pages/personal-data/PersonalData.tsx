import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './PersonalData.css';
import { useStorage } from "../../store/contextStore";
import { warnText } from "../../utils/static";
import { TPersonalData } from "../../utils/types";
type StorageData = {
  applyFormData: (data:TPersonalData) => void;
  personalData: TPersonalData;
}
export const PersonalData: React.FC = () => {
    const navigate = useNavigate();
    const { applyFormData,personalData }: StorageData   = useStorage();
    const [validated, setValidated] = useState(false);
    const [isValidMask,setValidMask] = useState(false);

    const submitForm = (form: Array<Record<string,string>>) => {
        const obj : Record<string,string> = {};
        for(let i = 0 ;i < 4;i++){      
          obj[form[i]['id']] = form[i]['value'];   
        }
        applyFormData(obj as TPersonalData);
        navigate('/job'); 
    }
    const handleInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
      
    const inputValue = e.target.value.toString().replaceAll(' ','').split('');

    if(!Number(e.target.value.replaceAll(' ',''))) {
        if(inputValue.length > 1){      
            inputValue.pop();
            const num = inputValue.join('').replace(/\D/g, '').match(/(\d{0,4})(\d{0,3})(\d{0,3})/);
            if(num)
            e.target.value =  + num[1] + (num[2] ? ` ${num[2]}` : '') + (num[3] ? ` ${num[3]}` : '');
            e.target.value = '0' + e.target.value;
        }else{
                e.target.value = '';
            }
        }else{
            const num = e.target.value.replaceAll(' ','').replace(/\D/g, '').match(/(\d{0,4})(\d{0,3})(\d{0,3})/);
            if(num)
            e.target.value = + num[1] + (num[2] ? ` ${num[2]}` : '') + (num[3] ? ` ${num[3]}` : '');
            e.target.value = '0' + e.target.value;
        }
      
    if(inputValue.length === 10){
             setValidMask(false);
        }else{
            setValidMask(true);
        }   
        e.preventDefault();
        e.stopPropagation();    
  }
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    const form = e.currentTarget;

    if (!form.checkValidity()) {  
        e.preventDefault();
        e.stopPropagation();          
  }else{
    submitForm(form);
  }
  e.preventDefault();
  e.stopPropagation();
  setValidated(true); 
  };
    
  useEffect(()=>{
    console.log(personalData);
  },[])

    return (<>
     <Form className="form" noValidate validated={validated} onSubmit={handleSubmit}>
      <h3>Личные данные</h3>
        <Form.Group  controlId="phone">
          <Form.Label>Телефон</Form.Label>
          <Form.Control     
            required
            isInvalid={isValidMask}
            type="text"
            minLength={12}
            maxLength={12}
            defaultValue={personalData ? personalData.phone: '' }
            placeholder="Тел. номер формата 0XXX XXX XXX"
            onChange={handleInputPhone}
          />   
             <Form.Control.Feedback type="invalid">
             {isValidMask ? 'Длина номера 10 цифр!': warnText}
            </Form.Control.Feedback>   
        </Form.Group>
        <Form.Group  controlId="firstname">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            required
            defaultValue={personalData ? personalData.firstname : '' }
            minLength={2}
            maxLength={20}
            type="text"
            placeholder="Введите имя мин. 2 символа"
          />
            <Form.Control.Feedback type="invalid">
            {warnText}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Фамилия</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              defaultValue={personalData ? personalData.lastname : '' }
              minLength={3}
              maxLength={20}
              placeholder="Введите фамилию мин. 3 символа"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
            {warnText}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="gender">
        <Form.Label>Пол</Form.Label>
        <Form.Control as='select' defaultValue={personalData ? personalData.gender : '' } required >
         <option hidden value="" >Выбрать пол</option>
      <option value="Мужской">Мужской</option>
      <option value="Женский">Женский</option>
    </Form.Control>
    <Form.Control.Feedback type="invalid">
            {warnText}
            </Form.Control.Feedback>
    </Form.Group>   
      <Button variant="success" disabled={isValidMask} type="submit">Далее</Button>
    </Form>
    </>);
}