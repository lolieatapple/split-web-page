import { LoadingButton } from '@mui/lab'
import { Button, Paper, Stack, TextField } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Iframe from 'react-iframe'


function Frame(props) {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  return <div style={{padding:'10px', height:'100%', position: 'relative'}}>
    <Stack spacing={2} direction="row" sx={{marginBottom: '10px'}}>
    <TextField label="Enter Web Site URL Here" variant="standard" fullWidth size='small' value={url} onChange={(e)=>setUrl(e.target.value)}/>
    <LoadingButton variant='contained' onClick={()=>{
      let _url = url;
      if(!_url.startsWith('http')) _url = 'https://' + _url;
      setIframeUrl(_url);
      console.log('url', _url);
      // window.document.frames[props.name].location = _url;
    }} >Go</LoadingButton>
    </Stack>
    <div style={{ top: '60px', right: '3px', bottom: '3px', left: '3px', position: 'absolute'}}>
      <Iframe url={iframeUrl} name={props.name} width={"100%"} height={"100%"} styles={{border: '1px solid gray', borderRadius: '10px'}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full" />
    </div>
  </div>
}

export default function Home() {
  const [mode, setMode] = useState("1");
  return (
    <div className={styles.container}>
      <Head>
        <title>Spliter</title>
        <meta name="description" content="Open multiple websites in a single page by split screens" />
        <link rel="icon" href="/spliter2.png" />
      </Head>

      <main className={styles.main}>
        <Paper elevation={4}>
          <Stack spacing={1} direction="row" sx={{padding: '10px'}}>
            <Image src="/spliterLogo.png" alt="logo" width={200} height={30} style={{marginTop:'4px'}} />
            <Button variant={mode === "1" ? 'contained' : ''} onClick={()=>setMode('1')} >
              <Image src="/spliter2.png" alt="2" width={40} height={30} />
            </Button>
            <Button variant={mode === "2" ? 'contained' : ''}><Image src="/spliter3.png" alt="2" width={40} height={30} onClick={()=>setMode('2')} /></Button>
            <Button variant={mode === "3" ? 'contained' : ''}><Image src="/spliter4.png" alt="2" width={40} height={30} onClick={()=>setMode('3')} /></Button>
            <Button variant={mode === "4" ? 'contained' : ''}><Image src="/spliter5.png" alt="2" width={40} height={30} onClick={()=>setMode('4')} /></Button>
          </Stack>
        </Paper>
        <Stack spacing={1} direction={['1', '2', '4'].includes(mode) ? 'row': 'column'} sx={{paddingTop: '10px'}} fullWidth>
          <Paper elevation={4} style={{width: '100%', height: ['1', '2'].includes(mode) ? '94vh' : '46vh'}}>
            <Frame mode={mode} name={'a'} />
          </Paper>
          <Paper elevation={4} style={{width: '100%', height: ['1', '2'].includes(mode) ? '94vh' :  '46vh'}}>
            <Frame mode={mode} name={'b'} />
          </Paper>
          {
            ['2'].includes(mode) && <Paper elevation={4} style={{width: '100%', height: ['1', '2'].includes(mode) ? '94vh' :  '46vh'}}>
              <Frame mode={mode} name={'c'}/>
            </Paper>
          }
        </Stack>
        {
          ['4'].includes(mode) && <Stack spacing={1} direction={['1', '2', '4'].includes(mode) ? 'row': 'column'} sx={{paddingTop: '10px'}} fullWidth>
          <Paper elevation={4} style={{width: '100%', height: ['1', '2'].includes(mode) ? '94vh' :  '46vh'}}>
            <Frame mode={mode} name={'d'}/>
          </Paper>
          <Paper elevation={4} style={{width: '100%', height: ['1', '2'].includes(mode) ? '94vh' :  '46vh'}}>
            <Frame mode={mode} name={'e'}/>
          </Paper>
        </Stack>
        }
      </main>
    </div>
  )
}

