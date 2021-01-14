package com.shutl.controller;

import com.shutl.model.Quote;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.HashMap;

@RestController
public class QuoteController {

    @RequestMapping(value = "/quote", method = POST)
    public @ResponseBody Quote quote(@RequestBody Quote quote) {
        Long price = Math.abs((Long.valueOf(quote.getDeliveryPostcode(), 36) - Long.valueOf(quote.getPickupPostcode(), 36))/100000000);
        HashMap<String, Long> vehicles = new HashMap<String, Long>();
        vehicles.put("bicycle", Long.valueOf(110));
        vehicles.put("motorbike", Long.valueOf(115));
        vehicles.put("parcel_car", Long.valueOf(120));
        vehicles.put("small_van", Long.valueOf(130));
        vehicles.put("large_van", Long.valueOf(140));
        Long priceWithMarkup = Long.valueOf(price * vehicles.get(quote.getVehicle())/100);
        return new Quote(quote.getPickupPostcode(), quote.getDeliveryPostcode(), quote.getVehicle(), priceWithMarkup);
    }
}
