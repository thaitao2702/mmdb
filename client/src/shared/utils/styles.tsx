export const getStyleFromProps = (props: { [key: string]: any }) => {
    const propsKeys = Object.keys(props);
    const styleKeys = propsKeys.filter(k => k.startsWith('_'));
    let stylesObj: { [key: string]: any } = {};
    stylesObj = styleKeys.reduce((prev, currentKey) => {
        const cssKey = currentKey.slice(1);
        prev[cssKey] = props[currentKey];
        return prev;
    }, stylesObj);
    return stylesObj;
}