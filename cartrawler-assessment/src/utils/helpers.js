// Helper: Extract legend info and update state
export function getLegendInfo(data, setLegend) {
    let legendStr = "";

    if (Array.isArray(data)) {
        data = data[0];
    }

    const rentalCore = data?.VehAvailRSCore?.VehRentalCore;

    if (rentalCore) {
        const pickUp = rentalCore.PickUpLocation?.["@Name"] || "";
        const pickTime = rentalCore["@PickUpDateTime"] || "";
        const returnTime = rentalCore["@ReturnDateTime"] || "";
        legendStr = `${pickUp} | Pickup: ${pickTime} | Return: ${returnTime}`;
    }
    return setLegend(legendStr);
}

// Helper: Sort cars by criteria
export function sortCars(cars, sortBy) {
    if (!Array.isArray(cars)) return [];

    const sorted = [...cars];

    if (sortBy === "price-asc") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
        sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
}

// Helper: Map API data to car objects
export function mapApiToCars(data) {
    if (Array.isArray(data)) data = data[0];

    const vehicleVendorAvails = data?.VehAvailRSCore?.VehVendorAvails;

    if (!Array.isArray(vehicleVendorAvails)) return [];

    return vehicleVendorAvails.flatMap((vendor) => {
        const vendorName = vendor.Vendor?.["@Name"] || "";
        const vendorCode = vendor.Vendor?.["@Code"] || "";
        return (vendor.VehAvails || []).map((veh) => {
            const makeModel = veh.Vehicle?.VehMakeModel?.["@Name"] || "";
            return {
                id: `${vendorCode || "vendor"}_${
                    veh.Vehicle?.["@Code"] || Math.random()
                }`,
                vendor: vendorName,
                vendorCode,
                name: makeModel,
                code: veh.Vehicle?.["@Code"] || "",
                transmission: veh.Vehicle?.["@TransmissionType"] || "",
                fuel: veh.Vehicle?.["@FuelType"] || "",
                driveType: veh.Vehicle?.["@DriveType"] || "",
                aircon:
                    veh.Vehicle?.["@AirConditionInd"] === "true" ? "Yes" : "No",
                passengerQty: veh.Vehicle?.["@PassengerQuantity"] || "",
                baggageQty: veh.Vehicle?.["@BaggageQuantity"] || "",
                doorCount: veh.Vehicle?.["@DoorCount"] || "",
                makeModel,
                price: veh.TotalCharge?.["@RateTotalAmount"]
                    ? parseFloat(veh.TotalCharge["@RateTotalAmount"])
                    : 0,
                currency: veh.TotalCharge?.["@CurrencyCode"] || "",
                pictureUrl: veh.Vehicle?.PictureURL || "",
                tags: [
                    { label: vendorName, variant: "primary" },
                    {
                        label: veh.Vehicle?.["@TransmissionType"] || "",
                        variant: "secondary",
                    },
                ],
            };
        });
    });
}
