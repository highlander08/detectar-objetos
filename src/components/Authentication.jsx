// /* eslint-disable no-useless-concat */
import React, { useEffect, useState } from "react";
import axios from "axios";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhtTklxZGRDalZJZGpfdlNZUk42ViJ9.eyJpc3MiOiJodHRwczovL2Rldi1taTUxcDFsdi51cy5hdXRoMC5jb20vIiwic3ViIjoiZWlQc0VLS3JYc2JTZTk2clFHZHNmWENkV0hQVUt5S09AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZnVsbC1zdGFjay1leGFtLWdldC11cGxvYWQtZGV0YWlscy1hcGkuY29tIiwiaWF0IjoxNjU1OTQ1NzU3LCJleHAiOjE2NTY1NTA1NTcsImF6cCI6ImVpUHNFS0tyWHNiU2U5NnJRR2RzZlhDZFdIUFVLeUtPIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.ArPAif9R-ZP9_Rc3Y_iM0EsxGRfdaFz4MT7IPrtnzDfYNOfR6iszF_Y6ndbDIAUL_lGwF6iu1QguVj1G6TSEipWxrM2xsd46Ejs-Q8GqKjzFkSLink68ER2K99KWgk1_T9y6Z_kYeTyDOECYIiJSuEhnuZO8RYwMMWYXdBWfqa6IfnDcnu8f6XhTWmZsvqWeLSbbiEkq4qXLDRD4pBnFbAJ8eu_1LIRHfEkK3aCyS9NHr7JtKc6UnhZZAgH8sEh066pduTl9IoI2aS6pgJhCV9ClV5v9KUBIcgs_k5tuUbuEs66YerzvZEqx7oDdPI_n0Cilq_SYGY5SyE5la2cMGw";



axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Sobre = () => {
  const [response, setResponse] = useState({});

  const fetchData = async () => {
    try {
      const result = await axios.get('https://8wvaarvrsc.execute-api.sa-east-1.amazonaws.com/default/fullstack_exam_get_presigned_url', {
        headers: { 'Content-Type': 'application/json'}
      }).then((response) => response.data)
      setResponse(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(response);

  return <h1>Sobre</h1>;
};

export default Sobre;
