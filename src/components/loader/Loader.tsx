import classes from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={classes.loader_container}>
            <div className={classes.loader}/>
        </div>

    );
};

export default Loader;