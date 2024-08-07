import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useStorage } from "../../store/contextStore";
import { warnText } from "../../utils/static";
import { TJobData, TPersonalData } from "../../utils/types";

type storageProps = {
  jobData: TJobData;
  jobList: Array<string>;
  personalData: TPersonalData;
  applyJobData: (data: TJobData) => void;
}
export const Job: React.FC = () => {
  const navigate = useNavigate();
  const { jobData,jobList,personalData,applyJobData }: storageProps = useStorage();
  const [validated, setValidated] = useState(false);
  const [workplace, setWorkPlace] = useState<string | null>(null);
  const [adress,setAdress] = useState<string | null>(null);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    const form = e.currentTarget;

    if (!form.checkValidity()) {  
        e.preventDefault();
        e.stopPropagation();          
  }else{
    if( adress && workplace) {
    applyJobData({adress,workplace});
    navigate('/param');
    }
  }
  e.preventDefault();
  e.stopPropagation();
  setValidated(true); 
  };
const handleAdress = (e: React.ChangeEvent<HTMLInputElement>) =>{
       if(e) {
        setAdress(e.target.value);
       }
}
const handleWorkPlace = (e: React.ChangeEvent<HTMLInputElement>) =>{
     if(e) {
      setWorkPlace(e.target.value);
     }
}
const backAction = () =>{
  if( adress && workplace) {
    applyJobData({adress,workplace})
  }
  navigate('/');
}
useEffect(()=> {
if(!personalData) navigate('/');

if(jobData) {
  console.log(jobData);
  setWorkPlace(jobData.workplace);
  setAdress(jobData.adress);
}
},[])

    return ( <Form className="form" noValidate validated={validated} onSubmit={handleSubmit}>
      <h3>Адрес и место работы</h3>
           <Form.Group controlId="workplace">
        <Form.Label>Место работы</Form.Label>
        <Form.Control defaultValue={jobData ? jobData.workplace : ''} onChange={handleWorkPlace} as='select' required >
        <option hidden value="" >Выбрать место</option>
        {jobList && jobList?.map((item,i) => ( <option key={i} value={item}>{item}</option>))}
    </Form.Control>
    <Form.Control.Feedback type="invalid">
            {warnText}
            </Form.Control.Feedback>
    </Form.Group> 
     <Form.Group controlId="adress">
          <Form.Label>Место проживания</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              minLength={5}
              placeholder="Введите адрес"
              aria-describedby="inputGroupPrepend"
              defaultValue={adress ? adress : ''}
              required
              onChange={handleAdress}
            />
            <Form.Control.Feedback type="invalid">
            {warnText}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button onClick={backAction} >Назад</Button>
      <Button variant="success" type="submit">Далее</Button>
    </Form>)
}