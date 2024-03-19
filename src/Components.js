import {motion} from "framer-motion";
import React from "react";

export const LoadingRectangle = () => {
    return (
        <motion.div
            style={{
                backgroundImage: "linear-gradient(0deg,#fbc2eb 0%, #a6c1ee 100%)",
                width: "30px",
                height: "30px",
                borderRadius: '10%',
                cursor: "pointer",
                marginLeft: '10px'
            }}
            initial={{ rotate: 0}}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            onClick={()=>window.location.reload()}
        />
    );
};

export const Meteor = ({delay}) => {
    return (
        <motion.div
            className={"meteor"}
            initial={{ opacity: 0, rotate: 45, x: '98vw', y: '-20vh' }}
            animate={{ opacity: [1, 0, 1], x: '-60vw', y: '110vh' }}
            transition={{ duration: 10, ease: 'easeIn', delay: delay, repeat: Infinity }}
        >
        </motion.div>
    );
};

export const MeteorAnimation = ({ animationSwitch ,number }) => {
    const stars = Array.from({ length: number }, (v, i) => i);
    return (
        <div className={"night"} style={{display: animationSwitch? 'none' : 'initial'}}>
            {stars.map((index) => (
                <Meteor key={index} delay={index}/>
            ))}
        </div>
    );
};

export const AnimationSwitchComponent = ({handleAnimationSwitch, animationSwitch}) => {
    return (
        <motion.div style={{
            width: "100px",
            height: "40px",
            top: "15vh",
            left: "5vw",
            padding: "5px",
            backgroundColor: '#FFFFFF88',
            borderRadius: '60px',
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            border: "1px solid black",
        }}>
            <motion.div
                style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: '50%',
                    backgroundImage: "linear-gradient(0deg,#fbc2eb 0%, #a6c1ee 100%)",
                    cursor: "pointer"
                }}
                initial={{x: 0, y: 0}}
                animate={animationSwitch? {x: "70px", y: 0} : {x: 0, y: 0}}
                onClick={handleAnimationSwitch}
                transition={{duration: 0.1 ,ease: 'linear'}}
            />
            <motion.p className={"functionText"} style={{position: "absolute", left: "-50px" }}>动画</motion.p>
        </motion.div>
    );
};

export const BackgroundSwitchComponent = ({handleBackgroundSwitch, backgroundSwitch}) => {
    return (
        <motion.div style={{
            width: "100px",
            height: "40px",
            top: "5vh",
            left: "5vw",
            padding: "5px",
            backgroundColor: '#FFFFFF88',
            borderRadius: '60px',
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            border: "1px solid black",
        }}>
            <motion.div
                style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: '50%',
                    backgroundImage: "linear-gradient(0deg,#fbc2eb 0%, #a6c1ee 100%)",
                    cursor: "pointer"
                }}
                initial={{x: 0, y: 0}}
                animate={backgroundSwitch? {x: "70px", y: 0} : {x: 0, y: 0}}
                onClick={handleBackgroundSwitch}
                transition={{duration: 0.1 ,ease: 'linear'}}
            />
            <motion.p className={"functionText"} style={{position: "absolute", left: "-50px" }}>背景</motion.p>
        </motion.div>
    );
};

export const AuthorLink = () => {
    return (
        <div className={"authorLink"} style={{
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "10vw",
            height: "5vh",
            right: "0vw",
            bottom: "0vh",
        }}>
            <div className={"hrefItem"}>
                <svg t="1710669103993" className="giteeIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1578" width="200" height="200"><path d="M512 512m-494.933333 0a494.933333 494.933333 0 1 0 989.866666 0 494.933333 494.933333 0 1 0-989.866666 0Z" fill="#C71D23" p-id="1579"></path><path d="M762.538667 457.045333h-281.088a24.4736 24.4736 0 0 0-24.439467 24.405334v61.098666c-0.034133 13.5168 10.922667 24.439467 24.405333 24.439467h171.1104c13.5168 0 24.439467 10.922667 24.439467 24.439467v12.219733a73.3184 73.3184 0 0 1-73.3184 73.3184h-232.209067a24.439467 24.439467 0 0 1-24.439466-24.439467v-232.174933a73.3184 73.3184 0 0 1 73.3184-73.3184h342.152533c13.482667 0 24.405333-10.922667 24.439467-24.439467l0.034133-61.098666a24.405333 24.405333 0 0 0-24.405333-24.439467H420.352a183.296 183.296 0 0 0-183.296 183.296V762.538667c0 13.482667 10.922667 24.439467 24.405333 24.439466h360.516267a164.9664 164.9664 0 0 0 165.000533-165.000533v-140.526933a24.439467 24.439467 0 0 0-24.439466-24.439467z" fill="#FFFFFF" p-id="1580"></path></svg>
                <a href={"https://gitee.com/aliaslab"} >made by @aliaslab</a>
            </div>
            <div className={"hrefItem"}>
                <svg t="1710669103993" className="giteeIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1578" width="200" height="200"><path d="M512 512m-494.933333 0a494.933333 494.933333 0 1 0 989.866666 0 494.933333 494.933333 0 1 0-989.866666 0Z" fill="#C71D23" p-id="1579"></path><path d="M762.538667 457.045333h-281.088a24.4736 24.4736 0 0 0-24.439467 24.405334v61.098666c-0.034133 13.5168 10.922667 24.439467 24.405333 24.439467h171.1104c13.5168 0 24.439467 10.922667 24.439467 24.439467v12.219733a73.3184 73.3184 0 0 1-73.3184 73.3184h-232.209067a24.439467 24.439467 0 0 1-24.439466-24.439467v-232.174933a73.3184 73.3184 0 0 1 73.3184-73.3184h342.152533c13.482667 0 24.405333-10.922667 24.439467-24.439467l0.034133-61.098666a24.405333 24.405333 0 0 0-24.405333-24.439467H420.352a183.296 183.296 0 0 0-183.296 183.296V762.538667c0 13.482667 10.922667 24.439467 24.405333 24.439466h360.516267a164.9664 164.9664 0 0 0 165.000533-165.000533v-140.526933a24.439467 24.439467 0 0 0-24.439466-24.439467z" fill="#FFFFFF" p-id="1580"></path></svg>
                <a href={"https://gitee.com/dwhview/hust-detours"}>our repository</a>
            </div>
        </div>
    );
}