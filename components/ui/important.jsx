const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xsm: 'text-[10px]'
};

const bgMap = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    o: 'bg-gradient-to-r from-[#D4FC79] to-[#96E6A1]',
    c: 'bg-gradient-to-r from-[#A5EFFF] to-[#E7F8FD]',
};

const radiusMap = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    full: 'rounded-full',
};

const textMap = {
    o: 'text-[#166534]',
    c: 'text-[#0891B2]'
}

const positionMap = {
    0:'-top-2 -right-1 px-1',
    1: 'top-2 left-2 p-1.5',
    2: 'top-1/2 left-2 p-1.5'
}


const Important = ({ text, background = 'red', percentage = 'md', size = 'md', position = 0 }) => {
    return (
        <span className={`absolute ${positionMap[position]} font-bold  ${sizeMap[size]} ${bgMap[background]} ${radiusMap[percentage]} ${background != 'red' ? textMap[background]: 'text-white' }`}>
            {text}
        </span>
    );
};

export default Important;
