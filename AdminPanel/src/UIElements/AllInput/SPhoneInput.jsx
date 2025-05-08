//SPhoneInput
const DEFAULT_UNIT = 'dp';
const allUnits = ['dp', 'pt', 'px', 'rpx'];
const unitOptions = allUnits.map(unit => ({ label: unit, value: unit }));

const SPhoneInput = (props) => {
    const [unit, setUnit] = React.useState(DEFAULT_UNIT);
    const [number, setNumber] = React.useState(0);

    React.useEffect(() => {
        if (typeof props.value === 'string' && props.value !== '') {
            const [parsedNumber, parsedUnit] = props.value?.split(/(?<=\d)(?=[a-z%])/);
            setNumber(Number(parsedNumber));
            setUnit(parsedUnit);
        } else if (typeof props.value === 'number') {
            setNumber(props.value);
            setUnit(DEFAULT_UNIT);
        } else {
            setNumber(0);
            setUnit(DEFAULT_UNIT);
        }
    }, [props.value]);

    const handleNumberChange = value => {
        if (value === null) {
            setNumber(0);
            props.onChange?.(`0${unit}`);
        } else {
            setNumber(value);
            props.onChange?.(`${value}${unit}`);
        }
    };

    const handleUnitChange = value => {
        setUnit(value);
        props.onChange?.(`${number}${value}`);
    };

    return (
        <InputNumber
            value={number}
            onChange={handleNumberChange}
            disabled={props.disabled}
            style={props.style}
            onBlur={props.onBlur}
            addonAfter={
                <Select
                    value={unit}
                    onChange={handleUnitChange}
                    onBlur={props.onBlur}
                    disabled={props.disabled}
                    options={unitOptions}
                    showSearch
                ></Select>
            }
        />
    );
};

export default SPhoneInput;