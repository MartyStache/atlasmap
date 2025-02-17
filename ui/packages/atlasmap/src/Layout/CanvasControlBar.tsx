/*
    Copyright (C) 2017 Red Hat, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import {
  ExpandArrowsAltIcon,
  ExpandIcon,
  SearchMinusIcon,
  SearchPlusIcon,
} from '@patternfly/react-icons';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import {
  TopologyControlBar,
  TopologyControlButton,
  createTopologyControlButtons,
} from '@patternfly/react-topology';

import { useCanvas } from '../UI';

export function getToolbarIconStyle(active: boolean) {
  return { color: active ? 'var(--pf-global--primary-color--100)' : undefined };
}

export interface ICanvasControlBarProps {
  disabled?: boolean;
  extraButtons?: TopologyControlButton[];
}

export const CanvasControlBar: FunctionComponent<ICanvasControlBarProps> = ({
  disabled = false,
  extraButtons = [],
}) => {
  const { updateZoom, resetZoom, resetPan } = useCanvas();

  const handleZoomIn = useCallback(() => {
    updateZoom(0.2);
  }, [updateZoom]);
  const handleZoomOut = useCallback(() => {
    updateZoom(-0.2);
  }, [updateZoom]);
  const handleViewReset = useCallback(() => {
    resetZoom();
    resetPan();
  }, [resetZoom, resetPan]);

  const controlButtons = useMemo(
    () =>
      createTopologyControlButtons({
        zoomIn: true,
        zoomInIcon: <SearchPlusIcon />,
        zoomInTip: 'Zoom In',
        zoomInAriaLabel: ' ',
        zoomInCallback: handleZoomIn,
        zoomInDisabled: disabled,
        zoomInHidden: false,

        zoomOut: true,
        zoomOutIcon: <SearchMinusIcon />,
        zoomOutTip: 'Zoom Out',
        zoomOutAriaLabel: ' ',
        zoomOutCallback: handleZoomOut,
        zoomOutDisabled: disabled,
        zoomOutHidden: false,

        fitToScreen: false,
        fitToScreenIcon: <ExpandArrowsAltIcon />,
        fitToScreenTip: 'Fit to Screen',
        fitToScreenAriaLabel: ' ',
        fitToScreenCallback: () => void 0,
        fitToScreenDisabled: disabled,
        fitToScreenHidden: false,

        resetView: true,
        resetViewIcon: <ExpandIcon />,
        resetViewTip: 'Reset View',
        resetViewAriaLabel: ' ',
        resetViewCallback: handleViewReset,
        resetViewDisabled: disabled,
        resetViewHidden: false,

        legend: false,
        legendIcon: 'Legend',
        legendTip: '',
        legendAriaLabel: 'Legend',
        legendCallback: () => void 0,
        legendDisabled: disabled,
        legendHidden: false,

        customButtons: [...extraButtons],
      }),
    [handleZoomIn, disabled, handleZoomOut, handleViewReset, extraButtons],
  );

  return <TopologyControlBar controlButtons={controlButtons} />;
};
