import Journal from '@/components/journal';
export function generateStaticParams(){return ['observe','history','trends','timeline','profile','export','help'].map(section=>({section}));}
export const dynamicParams=false;
export default function Page(){return <Journal/>;}
