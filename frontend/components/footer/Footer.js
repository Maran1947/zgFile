const Footer = () => {
    return (
        <footer
            style={{
                width: "100%",
                height: "100px",
                borderTop: "1px solid #eaeaea",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <span style={{ fontWeight: "600" }}>
                {`</> with `}
                <span style={{ color: "red" }}>❤ </span>
                by
                <span style={{ color: "#0070f3" }}> Abhishek Maran.</span>
            </span>
        </footer>
    )
}

export default Footer