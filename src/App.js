import React, {useState, useRef}from 'react';
import {Card,  CardContent, makeStyles, Container, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';

function App() {
  const [text, setText]= useState('');
  const [imageUrl, setImageUrl]=useState('');
  const [scanResultFile, setScanResultFile]=useState('');
  const [scanResultWebCam, setScanResultWebCam]=useState('');
  const classes=usestyles();
  const qrRef= useRef(null);

  const generateQrCode= async () => {
    try{
      const response= await QRCode.toDataURL(text);
      setImageUrl(response);
       
    }
    catch(error){
   console.log(error);
    }
  }

  const handleErrorFile = (error) =>{
    console.log(error);
  }

  const handleScanFile = (result)=>{
    if(result)
    {
      setScanResultFile(result);
    }

  }

  const onScanFile =() =>{
    qrRef.current.openImageDialog();
  }

  const handleErrorWebCam=(error)=>{
console.log(error);
  }

  const handleScanWebCam= (result) => {
    if(result)
    {
  setScanResultWebCam(result);
    }

  }

  return (
    <Container className={classes.container}>
    
    <Card>
      <h2 className={classes.title}> QR code Generate and Download & Scan the QR code with React here..</h2>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xl={4} lg={4} md={6} sm={6} xs={12} >
            <TextField label="Enter the text here" onChange={(e)=> setText(e.target.value)}/>
            <Button className={classes.btn} variant="contained" color="primary" onClick={() => generateQrCode()}>Generate</Button>
            <br/>
            <br/>
            <br/>
            {imageUrl ? 
            (<a href={imageUrl} download>
              <img src={imageUrl} alt="img"/>
            </a>) : null}
          </Grid>
          <Grid item xl={4} lg={4} md={6} sm={6} xs={12} >
            <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan QR CODe</Button>
            <QrReader
              ref={qrRef}
              delay={300}
              style={{width: '100%'}}
              onError={handleErrorFile}
              onScan={handleScanFile}
              legacyMode

            />

            <h3>Scanned code will be : {scanResultFile}</h3>
          </Grid>
          <Grid item xl={4} lg={4} md={6} sm={6} xs={12} >
            <h3>Qr Code Scan by WebCam from your PC</h3>
            <QrReader
            
            delay={300}
            style={{width :'100%'}}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
            />
            <h3>Scanned by WebCam code: {scanResultWebCam}</h3>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
    </Container>
  );
}

const usestyles= makeStyles((theme) => ({
  container:{
    marginTop:10
  },
  title:{
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    background:'#3f51b5',
    color:'#fff',
    padding:20

  },
  btn:{
    marginTop:10,
    marginBottom:20

  }
}));
export default App;
