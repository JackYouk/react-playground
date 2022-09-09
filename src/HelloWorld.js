const HelloWorld = (props) => {
    console.log(props.name);

    // JSX Expressions: {}
    return (
        <h1>Hello World {props.name}</h1>
    );
}

export default HelloWorld;