import { collectionTypes } from "@atlasmap/core";

import React, { useCallback, ReactElement, useState } from "react";

import { useToggle, CustomClassDialog, ICustomClass } from "../../UI";
import { getCustomClassNameOptions } from "../utils/document";

type CustomClassCallback = (constant: ICustomClass) => void;

export function useCustomClassDialog(
  title: string,
): [ReactElement, (cb: CustomClassCallback, constant?: ICustomClass) => void] {
  const [
    onCustomClassCb,
    setOnCustomClassCb,
  ] = useState<CustomClassCallback | null>(null);

  const [
    initialCustomClass,
    setInitialCustomClass,
  ] = useState<ICustomClass | null>(null);

  const [customClassNames, setCustomClassNames] = useState<string[] | null>(
    null,
  );

  const { state, toggleOn, toggleOff } = useToggle(false);
  const onConfirm = useCallback(
    (constant: ICustomClass) => {
      if (onCustomClassCb) {
        onCustomClassCb(constant);
        toggleOff();
      }
    },
    [onCustomClassCb, toggleOff],
  );

  function getCustomClassNames(): string[] | null {
    if (!customClassNames) {
      (async () => {
        setCustomClassNames(await getCustomClassNameOptions());
      })();
    }
    return customClassNames;
  }

  const dialog = (
    <CustomClassDialog
      title={title}
      isOpen={state}
      customClassName={""}
      customClassNames={getCustomClassNames()}
      collectionTypeOptions={collectionTypes.map(([value, label]) => ({
        value,
        label,
      }))}
      onCancel={toggleOff}
      onConfirm={onConfirm}
      {...(initialCustomClass || { collectionType: "NONE" })}
    />
  );
  const onOpenCustomClassDialog = useCallback(
    (callback: CustomClassCallback, constant?: ICustomClass) => {
      // we use a closure to set the state here else React will think that callback
      // is the function to retrieve the state and will call it immediately.
      setOnCustomClassCb(() => callback);
      if (constant) {
        setInitialCustomClass(constant);
      }
      setCustomClassNames(null);
      toggleOn();
    },
    [toggleOn],
  );
  return [dialog, onOpenCustomClassDialog];
}
