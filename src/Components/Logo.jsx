const Logo = (props = {}) => {
    return <div className="logo">
        <h1 className="logo__text" { ...props }>BookZone</h1>
    </div>;
}

export default Logo;
