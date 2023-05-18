declare module '*.less' {
    const styles: { [key: string]: string };
    export default styles;
}

declare module 'react-maybe' {
    const Component: <T, T1>(props: { of: T, map?: (a: T) => T1, either: any, orElse: any }) => JSX.Element;
    export default Component;
}