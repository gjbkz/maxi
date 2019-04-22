import {createElement, useState, useEffect, HTMLAttributes} from 'react';
import {IPreferences} from '../../types';
import {AvailableFonts} from '../../util/constants';
import {filterBinSize, filterFont, filterScale} from '../../util/getDefaultPreferences';

interface IPreferencesProps {
    preferences: IPreferences,
    onChange: (newPreferences: IPreferences) => void,
}

interface IPreferencesFormElement extends HTMLFormElement {
    font: HTMLInputElement,
    binSize: HTMLInputElement,
    scale: HTMLInputElement,
}

interface IPreferencesFormElementProps extends HTMLAttributes<IPreferencesFormElement> {}

export const Preferences = (
    props: IPreferencesProps,
) => {
    const [preferences, setPreferences] = useState(props.preferences);
    useEffect(() => {
        const timer = setTimeout(() => {
            props.onChange(preferences);
        }, 300);
        return () => clearTimeout(timer);
    }, [preferences]);
    return createElement<IPreferencesFormElementProps, IPreferencesFormElement>(
        'form',
        {
            onChange: (event) => {
                const formElement = event.currentTarget;
                const font = filterFont(formElement.font.value);
                formElement.font.value = font;
                const binSize = filterBinSize(formElement.binSize.value);
                formElement.font.value = `${binSize}`;
                const scale = filterScale(formElement.scale.value);
                formElement.font.value = `${scale}`;
                setPreferences({
                    font,
                    binSize,
                    scale,
                });
            },
        },
        createElement('h2', null, 'Fonts'),
        ...AvailableFonts.map((font) => createElement(
            'input',
            {
                type: 'radio',
                name: 'font',
                value: font,
                defaultChecked: preferences.font === font,
            },
        )),
        createElement(
            'input',
            {
                type: 'number',
                name: 'binSize',
                min: 0,
                max: 30,
                defaultValue: preferences.binSize,
            },
        ),
        createElement(
            'input',
            {
                type: 'number',
                name: 'scale',
                min: 1,
                max: 10,
                defaultValue: preferences.scale,
            },
        ),
    );
};