import React, {useEffect, useState, useRef} from 'react';
import './Interface.css';
import {motion} from "framer-motion";
import {LoadingRectangle, MeteorAnimation, AnimationSwitchComponent, BackgroundSwitchComponent, AuthorLink} from './Components.js'

//定义服务端ip
const hostIP = "10.12.177.56"

//WebSocketComponent:接收node程序转发的消息，展示
const WebSocketComponent = ({ analysis, updateAnalysis }) => {
    const ws = useRef(new WebSocket(`ws://${hostIP}:8081`));
    const [blocks, setBlocks] = useState([]);
    const debugWindowRef = useRef(null);

    //左侧窗口添加内容时自动滚动至底线
    useEffect(() => {
        if (debugWindowRef.current) {
            debugWindowRef.current.scrollTop = debugWindowRef.current.scrollHeight;
        }
    }, [blocks]);

    //处理来自服务端的消息
    useEffect(() => {
        ws.current.onopen = () => {
            updateAnalysis('连接成功');
        }
        ws.current.onmessage = (event) => {
            const message = event.data;
            if (message.includes("[tips]")) {
                updateAnalysis(message);
            }
            const currentTime = new Date().toLocaleTimeString();
            const newBlock = { message, time: currentTime };
            setBlocks(prevBlocks => [...prevBlocks, newBlock]);
        };
        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
                updateAnalysis('连接已断开');
            }
        };
    }, [ws]);

    return (
        <div ref={debugWindowRef} className="debugWindow">
            {blocks.map((block, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="messageBlock"
                    whileHover={{ backgroundColor: "#f8f8f8", fontSize: "20px", transition: {delay: 0 }}}
                >
                    <p>{'<' + block.time + '>    ' + block.message}</p>
                </motion.div>
            ))}
        </div>
    );
};

//AnalysisWindow:结果分析窗口
function AnalysisWindow({analysisMessages, analysisRef}) {
    console.log('analysis: ' + analysisMessages);
    return (
        <div className="analysisWindow" ref={analysisRef}>
            {analysisMessages.map((message, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="messageBlock"
                    whileHover={{ scale: 1.03, backgroundColor: "#f8f8f8", fontSize: "25px", transition: {delay: 0.1 }}}
                >
                    <p>{message}</p>
                </motion.div>
            ))}
        </div>
    );
}

// function AnalysisButton({text}) {
//     return (
//         <motion.button
//             className="debugButton"
//             style={{
//                 width: "calc(5vw + 10px)",
//                 height: "5vh",
//                 borderRadius: '15%',
//                 backgroundImage: "linear-gradient(120deg,#e0c3fc 0%, #8ec5fc 100%)",
//             }}
//             initial={{x: 0, y: "5vh"}}
//             whileHover={{opacity: 0.8}}
//             transition={{ duration: 0.5, ease: 'easeInOut'}}
//         >{text}</motion.button>
//     );
// }

function UploadButton({text, analysis, updateAnalysis}) {
    const inputRef = useRef(null);
    const handleUpload = () => {
        const file = inputRef.current.files[0];
        console.log('file: ' + file);
        const formData = new FormData();
        const fileName = file.name;
        formData.append("file", file, fileName);
        fetch(`http://${hostIP}:3080/upload`, { method: "POST", body: formData })
            .then(response => {
                console.log('received response:');
                console.log(response);
                const uploadMessage = `文件${fileName}上传成功`;
                updateAnalysis(uploadMessage);
            })
            .catch(error => {
                console.log('error when uploading!');
            });
        inputRef.current.value = null;
    };
    return (
        <motion.button
            className="uploadButton"
            style={{
                width: "calc(5vw + 10px)",
                height: "5vh",
                borderRadius: '10%',
                backgroundImage: "linear-gradient(120deg,#e0c3fc 0%, #8ec5fc 100%)",
                borderColor: "transparent",
            }}
            initial={{x: 0, y: "5vh"}}
            whileHover={{opacity: 0.8}}
            transition={{ duration: 0.5, ease: 'easeInOut'}}
            onClick={()=>inputRef.current.click()}
            content={"上传"}
        >
            {text} <input type={"file"} ref={inputRef} style={{display: "none"}} onInput={handleUpload}/>
        </motion.button>
    );
}

//Interface:包含各种组件的主页面
function Interface() {
    const [backgroundSwitch, setBackgroundSwitch] = useState(false);
    const [animationSwitch, setAnimationSwitch] = useState(false);
    const [analysis, setAnalysis] = useState([]);
    const analysisRef = useRef(null);

    useEffect(()=>{
        if (analysisRef.current) {
            analysisRef.current.scrollTop = analysisRef.current.scrollHeight;
        }
    }, [analysis]);

    const handleBackgroundSwitch = () => {
        setBackgroundSwitch(!backgroundSwitch);
    }
    const updateAnalysis = (message) => {
        setAnalysis(analysis => [...analysis, message]);
    }
    const handleAnimationSwitch = () => {
        setAnimationSwitch(!animationSwitch);
    }
    return (<>
            <div className={"backgroundPortion"}>
                <MeteorAnimation animationSwitch={animationSwitch} number={5}/>
                <BackgroundSwitchComponent handleBackgroundSwitch={handleBackgroundSwitch} backgroundSwitch={backgroundSwitch}/>
                <AnimationSwitchComponent handleAnimationSwitch={handleAnimationSwitch} animationSwitch={animationSwitch}/>
                <AuthorLink/>
            </div>
            <motion.div className={"mainHtml"} style={{backgroundImage: backgroundSwitch? "linear-gradient(132deg, rgb(65, 80, 95) 0.00%, rgb(36, 37, 38) 100.00%)" : "linear-gradient(132deg, rgb(59, 55, 106) 0.00%, rgb(0, 143, 186) 50.00%, rgb(255, 149, 213) 100.00%)"}}>
                <div className={"titlePortion"}>
                    <motion.p
                        style={{
                            color: "transparent",
                            backgroundImage: "linear-gradient(0deg,#fbc2eb 0%, #a6c1ee 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            position: "relative",
                        }}
                        className="titleContent"
                        initial={{opacity: 0.1, y: -300}}
                        animate={{opacity: 1, y: 0, transition: {duration: 3}}}
                        whileTap={{scale: 0.8}}
                    >Detours Interface
                    </motion.p>
                    <LoadingRectangle/>
                </div>
                <div className={"displayPortion"}>
                    <div className={"mainInterface"}>
                        <WebSocketComponent analysis={analysis} updateAnalysis={updateAnalysis}/>
                        <AnalysisWindow analysisRef={analysisRef} analysisMessages={analysis}/>
                    </div>
                    <UploadButton text={"上传"} analysis={analysis} updateAnalysis={updateAnalysis}/>
                    {/*<AnalysisButton text={"分析"}/>*/}
                </div>
            </motion.div>
        </>
    );
}

export default Interface;