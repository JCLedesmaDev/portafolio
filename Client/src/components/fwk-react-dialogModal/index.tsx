/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import css from "./index.module.css";

interface Props {
    children: any;
    isOpen: boolean;
    onClose: () => void;
}

export const DialogModal: React.FC<Props> = (props) => {

    /// VARIABLES
    const [updateCss, setUpdateCss] = useState(css.containerModal)
    const [childrens, setChildrens] = useState({
        header: null,
        body: null,
        footer: null
    })

    const showDialog = () => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        $body.style.overflowY = "hidden";
        setUpdateCss(`${css.container} ${css["container--open"]}`)
    }

    const closeDialog = () => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        $body.style.overflowY = "scroll";
        setUpdateCss(css.container)
    }

    const defineChildrens = () => {
        const isSeveralChildrens = Array.isArray(props.children)

        if (isSeveralChildrens) {
            const fndHeader = props.children.find((x: any) => x.props.id === 'header')
            const fndBody = props.children.find((x: any) => x.props.id === 'body')
            const fndFooter = props.children.find((x: any) => x.props.id === 'footer')
            setChildrens((prevVal) => ({
                ...prevVal,
                ...(fndHeader && { header: fndHeader }),
                ...(fndBody && { body: fndBody }),
                ...(fndFooter && { footer: fndFooter })
            }))
        } else {
            setChildrens((prevVal) => ({
                ...prevVal,
                [props.children.props.id]: props.children,
            }))
        }
    }

    useEffect(() => {
        if (props.isOpen) {
            defineChildrens()
            showDialog()
        } else { closeDialog() }
    }, [props.isOpen])

    return ReactDOM.createPortal(props.isOpen && (
        <article className={updateCss}>
            <div className={`${css.content}`} >

                {childrens.header && childrens.header}

                {childrens.body && childrens.body}

                {childrens.footer ?? (
                    <button onClick={props.onClose}>CERRAR</button>
                )}

            </div>
        </article>),
        document.getElementById('root') as HTMLElement
    );
};