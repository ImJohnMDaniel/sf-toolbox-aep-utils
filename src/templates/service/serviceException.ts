const serviceException: string = `public class {{=it.svcNames.getServiceExceptionClassName()}} extends Exception {}
`;

export default serviceException;
