import React, { useRef, useState } from "react";
import styled from "styled-components";
import ResponsiveAppBar from "../components/AppBar";
import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

// FIXME: Definir caixar das marcações do objeto
const ContainerImg = styled.div`
  position: absolute;

  /* FIXME: pegar valores das propriedades do componente */
  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};

  border: 4px solid red;
  background-color: transparent;
  z-index: 20;

  /* FIXME: definir porcentagem e nome do objeto em cima da caixa delimitadora */
  &::before {
    content: "${({ classType, score }) => `${classType} ${score.toFixed(1)}%`}";
    color: red;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`;

export const Detector = (props) => {
  // FIXME: acessar a imagem enviada
  const fileInputRef = useRef();
  // FIXME: acessar a imagem atualizada
  const imageRef = useRef();
  //FIXME:  armazenar dados da imagem
  const [imgData, setImgData] = useState(null);
  //FIXME: armazenar as previsoes do objeto
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //FIXME: detectar se as projeções estao vazias
  const isEmptyPredictions = !predictions || predictions.length === 0;

  //FIXME: selecionar imagem
  const File = () => {
    //FIXME: se nao for null, adicione um evento de clique
    if (fileInputRef.current) fileInputRef.current.click();
  };
  //FIXME: normalizar a caixa de marcação do objeto
  const Predictions = (predictions, imgSize) => {
    //FIXME:  verificar se o tamanho e largura da imagem é valida
    if (!predictions || !imgSize || !imageRef) return predictions || [];
    return predictions.map((prediction) => {
      //FIXME: obter os valores antigos
      const { bbox } = prediction;
      const oldX = bbox[0];
      const oldY = bbox[1];
      const oldWidth = bbox[2];
      const oldHeight = bbox[3];

      //FIXME: pegar a largura e altura da imagem atual para normalizar a caixa de delimitação
      const imgWidth = imageRef.current.width;
      const imgHeight = imageRef.current.height;

      //FIXME: fazer a traduçao para normalizar a caixa delimitadora
      const x = (oldX * imgWidth) / imgSize.width;
      const y = (oldY * imgHeight) / imgSize.height;
      const width = (oldWidth * imgWidth) / imgSize.width;
      const height = (oldHeight * imgHeight) / imgSize.height;

      return { ...prediction, bbox: [x, y, width, height] };
    });
  };
 
  const ObjectImgDetect = async (imageElement, imgSize) => {
    //FIXME: Carregue o modelo do coco sdd
    const model = await cocoSsd.load({});
    //FIXME: Detecte objetos para uma imagem retornando uma lista de caixas delimitadoras com classe assocada e pontuação.
    const predictions = await model.detect(imageElement, 6);
    //FIXME: normalizar a caixa de marcação do objeto
    const normalizedPredictions = Predictions(predictions, imgSize);
    //FIXME: preencher o array com as novas previsoes
    setPredictions(normalizedPredictions);
    console.log("Predictions: ", predictions);
  };

 
  //FIXME: ler a imagem
  const ReadImg = (file) => {
    return new Promise((success, reject) => {
      //FIXME: instanciar o leitor de arquivos
      const fileReader = new FileReader();
      //FIXME:  ao carregar imagem passe para o success os dados da imagem
      fileReader.onload = () => success(fileReader.result);
      //FIXME: se houver algum erro, lance-o
      fileReader.onerror = () => reject(fileReader.error);
      //FIXME:  URL codificada em base64 do arquivo.
      fileReader.readAsDataURL(file);
    });
  };

 
  const displayImg = async (e) => {
    //FIXME: apos reconhecer o objeto limpe o array de previsoes
    setPredictions([]);
    setLoading(true);

    //FIXME: acessar a imagem enviada 
    const file = e.target.files[0];
    //FIXME: enviar a imagem para a ReadImg()
    const imgData = await ReadImg(file);
    //FIXME: guardar dados da imagem no estado
    setImgData(imgData);

    //FIXME: criar elemento de imagem html
    const imageElement = document.createElement("img");
    //FIXME: adicionar a url em bas64 para o atributo src
    imageElement.src = imgData;

    //FIXME: ao carregar imagem faça algo
    imageElement.onload = async () => {
      //FIXME: pegar os valores do elemento image 
      const imgSize = {
        width: imageElement.width,
        height: imageElement.height,
      };
      //FIXME: chamar o objeto de detecção passando a image e o tamanho da mesma
      await ObjectImgDetect(imageElement, imgSize);
      setLoading(false);
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ResponsiveAppBar />
      <div style={{ minWidth: "200px", height: "700px", position: "relative" }}>
        {/*FIXME:  se imgData for true renderize a imagem */}
        {imgData && (
          <img
            style={{ height: "100%" }}
            src={imgData}
            ref={imageRef}
            alt="img"
          />
        )}
        {/*FIXME:  se projeções nao for nula percorra elas e passe as propriedade  */}
        {!isEmptyPredictions &&
          predictions.map((prediction, idx) => (
            <ContainerImg
              key={idx}
              //FIXME:  acessar os elemento da matriz de previsoes
              x={prediction.bbox[0]}
              y={prediction.bbox[1]}
              width={prediction.bbox[2]}
              height={prediction.bbox[3]}
              //FIXME:  tipo da classe
              classType={prediction.class}
              //FIXME:  ler pontuação
              score={prediction.score * 100}
            />
          ))}
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={displayImg}
        multiple="multiple"
      />
      <button
        onClick={File}
        style={{
          padding: "7px 10px",
          border: "2px solid black",
          color: "#000000",
          marginTop: "2em",
          cursor: "pointer",
        }}
      >
        {isLoading ? "Carregando" : "Upload Image"}
      </button>
    </div>
  );
};

