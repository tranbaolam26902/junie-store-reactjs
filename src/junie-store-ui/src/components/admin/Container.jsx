export default function Container({ children, className }) {
    return <section className={`px-6 py-4 w-full bg-gray/40${className ? ' ' + className : ''}`}>{children}</section>;
}
