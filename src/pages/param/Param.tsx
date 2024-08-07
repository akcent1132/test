import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import RangeSlider from 'react-bootstrap-range-slider';
// использую библиотеку react-bootstrap-range-slider из-за реализации min max параметров
import { TJobData, TParamData, TPersonalData } from "../../utils/types";
import { useStorage } from "../../store/contextStore";
type storageProps = {
    paramData: TParamData;
    jobData: TJobData;
    jobList: Array<string>;
    personalData: TPersonalData;
    applyParamData: (data: TParamData) => void;
    clearAll: () => void;
  }
export const Param: React.FC = () => {
    const navigate = useNavigate();
    const { paramData,jobData,personalData,applyParamData,clearAll }: storageProps = useStorage();
    const [isLoading, setLoading] = useState(false);
    const [sliderValue, setSliderValue] = useState(10);
    const [sliderSumValue, setSliderSumValue] = useState(200);

    const [show, setShow] = useState(false);

    const handleClose = () => {
          setShow(false);
          clearAll();
          navigate('/');   
    };
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        addNewProduct(personalData);
      };
      const backAction = () =>{
        applyParamData({sum:sliderSumValue,days:sliderValue})
        navigate('/job');
      }
    const addNewProduct = (data: TPersonalData) => {
        setLoading(true);
        fetch('https://dummyjson.com/products/add', {         
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: data.firstname + ' ' + data.lastname,
            })
          })
          .then(res => res.json())
          .then(succes => {
            if(succes){
                setLoading(false);
                handleShow();
            }
            console.log});
    }
      useEffect(()=> {
        if(!personalData) navigate('/');
        if(personalData && !jobData) navigate('/job');
        if(paramData) {
          setSliderValue(paramData.days);
          setSliderSumValue(paramData.sum);
        }
        },[personalData, navigate, jobData, paramData]);
return (<><Form className="form" noValidate >
      <h3>Параметры займа</h3>
      <Form.Group className="range" controlId="sum">
        <h5>Сумма займа</h5>
      <RangeSlider
      value={sliderSumValue}
      min={200}
      max={1000}
      onChange={e => setSliderSumValue(Number(e.target.value))}
    />
             <p>Выбранная сумма: {sliderSumValue}$</p>      
      </Form.Group>
      <Form.Group className="range" >
      <h5>Срок займа</h5>
      <RangeSlider
      value={sliderValue}
      min={10}
      max={30}
      onChange={e => setSliderValue(Number(e.target.value))}
    />
      <p>Выбранный период: {sliderValue} дней</p>
      </Form.Group>
      <Button disabled={isLoading} onClick={backAction} >Назад</Button>
      <Button disabled={isLoading} variant="success" onClick={handleSubmit}>{isLoading ? 'Loading…' : 'Подать заявку'}</Button>
       </Form>
       <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Заявление</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Поздравляем, ${personalData.firstname} ${personalData.lastname}. Вам одобрено ${sliderSumValue}$ на ${sliderValue} дней.`}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
           Завершить
          </Button>
        </Modal.Footer>
      </Modal>
       </>);
}
