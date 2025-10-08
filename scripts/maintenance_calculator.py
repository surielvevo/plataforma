"""Command line tool for calculating vehicle maintenance schedule.

This module replicates the logic from a Tkinter GUI script by accepting
kilometer readings and reporting whether maintenance is due.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass


@dataclass
class MaintenanceResult:
    """Represents the maintenance calculation output."""

    total_kilometers: float
    message: str


def calculate_maintenance(
    current_kilometers: float,
    next_service_kilometers: float,
    recent_trip_kilometers: float,
) -> MaintenanceResult:
    """Calculate remaining kilometers before the next maintenance.

    Args:
        current_kilometers: Current odometer reading of the vehicle.
        next_service_kilometers: Scheduled odometer reading for the next service.
        recent_trip_kilometers: Kilometers driven since the last recorded reading.

    Returns:
        MaintenanceResult with the new total kilometers and a descriptive message.

    Raises:
        ValueError: If any of the inputs are negative.
    """

    for value, label in (
        (current_kilometers, "current_kilometers"),
        (next_service_kilometers, "next_service_kilometers"),
        (recent_trip_kilometers, "recent_trip_kilometers"),
    ):
        if value < 0:
            raise ValueError(f"{label} must be greater than or equal to zero")

    total_kilometers = current_kilometers + recent_trip_kilometers
    remaining = next_service_kilometers - total_kilometers

    if remaining < 0:
        message = (
            "🚨 ¡Atención! Ya excediste el kilometraje de mantenimiento por "
            f"{-remaining:.0f} km."
        )
    elif remaining == 0:
        message = "🛠️ ¡Es momento exacto para realizar el mantenimiento!"
    else:
        message = f"✅ Faltan {remaining:.0f} km para el próximo mantenimiento."

    return MaintenanceResult(total_kilometers=total_kilometers, message=message)


def build_parser() -> argparse.ArgumentParser:
    """Create the argument parser for the CLI."""

    parser = argparse.ArgumentParser(
        description="Calcula el estado de mantenimiento del vehículo en la línea de comandos.",
    )
    parser.add_argument(
        "--km-actual",
        type=float,
        help="Kilometraje actual del vehículo en km.",
    )
    parser.add_argument(
        "--km-proximo",
        type=float,
        help="Kilometraje programado para el próximo mantenimiento en km.",
    )
    parser.add_argument(
        "--km-reciente",
        type=float,
        help="Kilometraje recorrido desde la última lectura en km.",
    )
    parser.add_argument(
        "--locale",
        choices={"en", "es"},
        default="es",
        help="Idioma del mensaje de salida (español por defecto).",
    )
    return parser


def format_output(result: MaintenanceResult, locale: str) -> str:
    """Generate a human readable description of the maintenance result."""

    header = {
        "es": "Kilometraje total actual",
        "en": "Current total mileage",
    }[locale]
    return f"{header}: {result.total_kilometers:.0f} km\n{result.message}"


def interactive_prompt(parser: argparse.ArgumentParser) -> argparse.Namespace:
    """Request user input from stdin when arguments are missing."""

    args = parser.parse_args()

    if args.km_actual is None:
        args.km_actual = float(input("Kilometraje actual del vehículo (km): "))
    if args.km_proximo is None:
        args.km_proximo = float(input("Próximo mantenimiento (km): "))
    if args.km_reciente is None:
        args.km_reciente = float(
            input("Kilometraje recorrido desde la última lectura (km): ")
        )

    return args


def main() -> None:
    parser = build_parser()
    args = interactive_prompt(parser)

    result = calculate_maintenance(
        current_kilometers=args.km_actual,
        next_service_kilometers=args.km_proximo,
        recent_trip_kilometers=args.km_reciente,
    )
    print(format_output(result, locale=args.locale))


if __name__ == "__main__":
    main()
