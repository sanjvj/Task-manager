import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { firstNameState, lastNameState } from '../store/atoms/state';

const RecoilStateInitializer = ({ children }) => {
  const setFirstName = useSetRecoilState(firstNameState);
  const setLastName = useSetRecoilState(lastNameState);

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");

    if (storedFirstName && storedLastName) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, [setFirstName, setLastName]);

  return children;
};

export default RecoilStateInitializer;
