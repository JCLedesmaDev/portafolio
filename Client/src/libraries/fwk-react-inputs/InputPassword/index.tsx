/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { IInputProps, IInputData, IInputRules } from "../interface/index.interface";
import css from "./index.module.css";
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { VisibilitySVG } from './svg/VisibilitySVG';
import { InvisibilitySVG } from './svg/InvisibilitySVG';

interface Props {
  props: IInputProps;
  className?: any;
}

export const InputPassword: React.FC<Props> = ({ props, className }) => {

  /// VARIABLES
  const { data, handleChange } = props;

  const refInput = useRef<any>()
  const [origVal, setOrigVal] = useState()
  const [visiblePassword, setVisiblePassowrd] = useState(false)
  const [local, setLocal] = useState<IInputData>({
    value: '',
    dirty: false,
    error: false,
    messageError: ''
  })

  const [cmpRules, setCmpRules] = useState<IInputRules[]>([{
    fnCondition: (val) => !(props.required && !!val),
    messageError: 'Este campo es requerido.'
  }])

  /// METODOS

  const initInput = () => {
    //console.log(`CONSTRUCTOR INPUT ${props.name}`)
    props.rules.forEach(rule => {
      setCmpRules((prevVal) => ([...prevVal, rule]))
    })
    setOrigVal(data.value)
    setLocal({
      value: data.value,
      dirty: data.dirty,
      error: data.error
    })
  }

  const validateRules = () => {
    //console.log(`Rules INPUT ${props.name}`)
    for (const rule of cmpRules) {

      if (rule.fnCondition(local.value)) {
        setLocal((prevData) => ({
          ...prevData, error: true, messageError: rule.messageError
        }))
        handleChange(props.name, {
          value: local.value, dirty: local.dirty, error: true
        })
        break;
      }

      setLocal((prevData) => ({
        ...prevData, error: false, messageError: ''
      }))
      handleChange(props.name, {
        value: local.value, dirty: local.dirty, error: false
      })
    }
  }

  const update = (evt: any) => {
    const { value, files } = evt.target;
    // En caso de cargar imagenes tb
    const imageInput = files != null && files[0];
    setLocal((prevData) => ({
      ...prevData,
      value: imageInput ? imageInput : value,
      dirty: value !== origVal
    }))
  }

  const rollback = () => {
    setLocal(() => ({
      error: false,
      value: origVal,
      dirty: false
    }))
    handleChange(props.name, {
      value: origVal, dirty: false, error: false
    })
    if (refInput.current) refInput.current.value = ''
  }

  const defineCSSInput = () => {
    let style = '';

    if (local.value === undefined) return style;
    if (local.error) {
      style = css['container__Item--incorrect']
    } else {
      style = css['container__Item--correct']
    }
    return style
  }

  const defineCSSMessage = () => {
    let style = css.container__messageError;

    if (local.value === undefined) return style;
    if (local.error) {
      style += ` ${css['container__messageError--active']}`
    }

    return style
  }


  const showPassword = () => {
    setVisiblePassowrd((prevVal) => !prevVal)
  }

  useEffect(() => { initInput() }, [])

  useEffect(() => { validateRules() }, [local.value])

  return (

    <div id={`form__${props.name}`} className={`${css.container} ${className}`}>

      <div className={css.container__Item}>

        {props.icon && (<label className={css.containerItem__iconPrepend}>  {props.icon} </label>)}

        <input ref={refInput} defaultValue={local.value} onKeyUp={update} placeholder={props.placeholder} type={visiblePassword ? 'text' : 'password'} name={props.name} required={props.required} autoComplete={props.autoComplete} className={defineCSSInput()} />


        {local.dirty && (
          <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
        )}

        {
          visiblePassword
            ? <InvisibilitySVG onClick={showPassword} className={css.container__Item__iconVisibilidad} />
            : <VisibilitySVG onClick={showPassword} className={css.container__Item__iconVisibilidad} />
        }

      </div>

      <p className={defineCSSMessage()}>{local.messageError}</p>

    </div>
  );
};
