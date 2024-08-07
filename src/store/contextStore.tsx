import React, {
    createContext,
    useContext,
    useEffect,
    useState,
  } from 'react';
import { TJobData, TParamData, TPersonalData } from '../utils/types';

  export const StoreContext = createContext(undefined);
  type Props = {
    children?: React.ReactNode
  };
export const StoreProvider : React.FC<Props> = ({children}: Props): React.ReactNode => {
    const [personalData,setPersonalData] = useState<TPersonalData | null>(null);
    const [paramData,setParamData] = useState<TParamData | null>(null);
    const [jobData,setJobData] = useState<TJobData | null>(null);
    const [jobList,setJobList] = useState(null);
    const applyParamData = (data:TParamData) => {
      setParamData(data);
    }
    const applyJobData = (data:TJobData) => {
      setJobData(data);
    }
    const applyFormData = (form:TPersonalData) => {
        setPersonalData(form)
    }
    const getJobList = () => {
      fetch('https://dummyjson.com/products/category-list')
       .then(res => res.json())
        .then(list => setJobList(list))
        .catch((e)=> console.error(e));
    }
    const clearAll = () => {
      setJobData(null);
      setPersonalData(null);
      setParamData(null);
    }
    useEffect(() => {
      getJobList()
    }, [])
return (<StoreContext.Provider value={{ personalData,jobData,paramData,jobList,applyFormData,applyJobData,applyParamData,clearAll }}>
    {children}
    </StoreContext.Provider>
);
}


export const useStorage = () => {
    const ctx = useContext(StoreContext);
  
    if (!ctx) {
      throw new Error(
        'useStorage should be used inside Context',
      );
    }
  
    return ctx;
  };