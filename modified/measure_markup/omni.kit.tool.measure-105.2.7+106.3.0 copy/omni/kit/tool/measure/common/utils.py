# Copyright (c) 2022, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.
#

from typing import Union

from pxr import UsdGeom

import omni.usd as ou

from .constant import UnitType


UNITS_PER_METER = {
    "mm" : 0.001,
    "cm" : 0.01,
    "dm" : 0.1,
    "m" : 1.0,
    "km" : 1000.0,
    "in" : 0.0254,
    "ft" : 0.3048,
    "mi" : 1609.34
}


# Method to get current stage units
def get_stage_units(as_enum: bool=False) -> Union[str, UnitType]:
    """
        Get the stage units as string or Enum

        Args:
            as_enum (bool): set the return to be an Enum
    """
    meters_per_unit = UsdGeom.GetStageMetersPerUnit(ou.get_context().get_stage())
    if meters_per_unit is None or equal_float(meters_per_unit, 0.01):
        return UnitType.CENTIMETERS if as_enum else "cm"
    elif equal_float(meters_per_unit, 0.001):
        return UnitType.MILLIMETERS if as_enum else "mm"
    # elif equal_float(meters_per_unit, 0.1):
    #     return "dm"
    elif equal_float(meters_per_unit, 1.0):
        return UnitType.METERS if as_enum else "m"
    elif equal_float(meters_per_unit, 1000.0):
        return UnitType.KILOMETERS if as_enum else "km"
    elif equal_float(meters_per_unit, 0.0254):
        return UnitType.INCHES if as_enum else "in"
    elif equal_float(meters_per_unit, 0.3048):
        return UnitType.FEET if as_enum else "ft"
    elif equal_float(meters_per_unit, 1609.34):
        return UnitType.MILES if as_enum else "mi"
    else:
        return f"x{meters_per_unit}m"


def get_stage_meters_per_unit() -> float:
    """
        Get stage meters per unit
    """
    return UsdGeom.GetStageMetersPerUnit(ou.get_context().get_stage()) # Default CM


def convert_distance_and_units(distance_in: float, units_in: str):
    """
        Convert stage units to uder defined units
    """
    stage_units = get_stage_units()
    if (units_in == stage_units):
        units_out = units_in
        return distance_in, units_out
    else:
        try:
            coeff = UNITS_PER_METER[units_in]
            distance_out = distance_in / coeff * get_stage_meters_per_unit()
            units_out = units_in
            return distance_out, units_out
        except KeyError:
            units_out = units_in
            return distance_in, units_out

def convert_area_to_units(value_in: float, units_in: str) -> float:
    match units_in:
        case "mm":
            return value_in * 100
        case "dm":
            return value_in / 10.0
        case "m":
            return value_in / 10000.0
        case "km":
            return value_in / 1e10
        case "in":
            return value_in / 6.452
        case "ft":
            return value_in / 929.0
        case "mi":
            return value_in / 2.59e+10
        case other:
            return value_in

# Math Utils
def equal_float(f1, f2, epsilon=0.0001) -> bool:
    """
        Method to compare float equality
    """
    return abs(f2) < epsilon if f1 == 0.0 else abs(f2 - f1) < abs(f1 + f2) * epsilon


def clip(value, min_value, max_value) -> Union[int, float]:
    """
        Clips input value to the min and max value if out of the range bounds

        Args:
            value: Value to clip
            min_value: Minimum Value
            max_value: Maximum Value
        Returns:
            Clipped value
    """
    return min_value if value < min_value else max_value if value > max_value else value


def remap(value, old_min, old_max, new_min, new_max, should_clip: bool = True) -> Union[int, float]:
    """
        Remaps value between min and max. Default will clip the value to bounds.

        Args:
            value: Value to remap
            old_min: previous minimum value bounds
            old_max: previous maximum value bounds
            new_min: new minimum value bounds
            new_max: new maximum value bounds
            should_clip (bool): Clip the value to new min and max bounds

        Returns:
            Remapped value

    """
    remapped_value = ( (value - old_min) * (new_max - new_min) / (old_max - old_min)) + new_min
    return clip(remapped_value, new_min, new_max) if should_clip else remapped_value


def remap_01(value, old_min, old_max, should_clip: bool = True) -> Union[int, float]:
    """
        Remaps value between 0 and 1. Default will clip value to bounds.

        Args:
            value: Value to remap
            old_min: previous minimum value bounds
            old_max: previous maximum value bounds
            should_clip (bool): Clip the value to new min and max bounds
    """
    remapped_value = (value - old_min) / (old_max - old_min)
    return clip(remapped_value, 0, 1) if should_clip else remapped_value


def flatten(transform) -> list:
    """Convert array[4][4] to array[16]"""

    # flatten the matrix by hand
    # USING LIST COMPREHENSION IS VERY SLOW (e.g. return [item for sublist in transform for item in sublist]), which takes around 10ms.
    m0, m1, m2, m3 = transform[0], transform[1], transform[2], transform[3]
    return [
        m0[0],
        m0[1],
        m0[2],
        m0[3],
        m1[0],
        m1[1],
        m1[2],
        m1[3],
        m2[0],
        m2[1],
        m2[2],
        m2[3],
        m3[0],
        m3[1],
        m3[2],
        m3[3],
    ]
