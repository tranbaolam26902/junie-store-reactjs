export default function Container({ className, children }) {
    return <section className={`mx-auto px-6 max-w-screen-2xl${className ? ' ' + className : ''}`}>{children}</section>;
}
