package com.example.hotel.controller;

import com.example.hotel.common.util.ResponseHelper;
import com.example.hotel.dto.CreateRoomDTO;
import com.example.hotel.dto.ServiceCreateDTO;
import com.example.hotel.dto.UpdateRoomDTO;
import com.example.hotel.dto.UserUpdateDTO;
import com.example.hotel.dto.bill.InfoBillDTO;
import com.example.hotel.dto.servicedto.OrderServiceDTO;
import com.example.hotel.dto.servicedto.OrderServiceResponse;
import com.example.hotel.model.RoomModel;
import com.example.hotel.model.ServiceModel;
import com.example.hotel.model.UserModel;
import com.example.hotel.service.HotelService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = {"http://localhost:5173/", "http://localhost:5174/"})
public class HotelController {
    @Autowired
    private HotelService hotelService;

    @Operation(summary = "Get all room")
    @GetMapping("rooms")
    public Object getAll() {
        List<RoomModel> rooms = hotelService.getAllRoom();

        return ResponseHelper.getResponse(rooms, HttpStatus.OK);
    }

    @Operation(summary = "Create new room")
    @PostMapping("rooms")
    public Object createRoom(@Valid @RequestBody CreateRoomDTO dto,
                         BindingResult result) {
        if(result.hasErrors()) {
            return ResponseHelper.getErrorResponse(result, HttpStatus.BAD_REQUEST);
        }

        CreateRoomDTO newRoom = hotelService.create(dto);

        return ResponseHelper.getResponse(newRoom, HttpStatus.CREATED);
    }

    @Operation(summary = "Update room ")
    @PostMapping("rooms/{id}")
    public Object updateRoom(@PathVariable String id, @Valid @RequestBody UpdateRoomDTO dto,
                         BindingResult result) {
        if(result.hasErrors()) {
            return ResponseHelper.getErrorResponse(result, HttpStatus.BAD_REQUEST);
        }

        RoomModel updateRoom = hotelService.update(UUID.fromString(id), dto);

        if (updateRoom == null) {
            return ResponseHelper.getErrorResponse("Room is not existed", HttpStatus.BAD_REQUEST);
        }

        return ResponseHelper.getResponse(updateRoom, HttpStatus.OK);
    }

    @Operation(summary = "Block room ")
    @PostMapping("rooms/{id}/block")
    public Object blockRoom(@PathVariable String id) {
        RoomModel updateRoom = hotelService.blockRoom(UUID.fromString(id));

        if (updateRoom == null) {
            return ResponseHelper.getErrorResponse("Room is not existed or not be FREE", HttpStatus.BAD_REQUEST);
        }

        return ResponseHelper.getResponse(updateRoom, HttpStatus.OK);
    }

    @Operation(summary = "Unblock room ")
    @PostMapping("rooms/{id}/unlock")
    public Object unblockRoom(@PathVariable String id) {
        RoomModel updateRoom = hotelService.unlockRoom(UUID.fromString(id));

        if (updateRoom == null) {
            return ResponseHelper.getErrorResponse("Room is not existed or not be BLOCK", HttpStatus.BAD_REQUEST);
        }

        return ResponseHelper.getResponse(updateRoom, HttpStatus.OK);
    }

    @Operation(summary = "Approve order request ")
    @GetMapping("/rooms/{booking-id}/approve")
    public Object approve(@PathVariable(name = "booking-id") String id, Float saleoff) {
        hotelService.approve(UUID.fromString(id), saleoff);
        return ResponseHelper.getResponse("Dat phong thanh cong", HttpStatus.OK);
    }

    @Operation(summary = "Cancel order request")
    @GetMapping("/rooms/{booking-id}/cancel")
    public Object cancel(@PathVariable(name = "booking-id") String id) {
        hotelService.cancel(UUID.fromString(id));
        return ResponseHelper.getResponse("Huy dat phong thanh cong", HttpStatus.OK);
    }

    @Operation(summary = "Checkin booking room ")
    @GetMapping("/rooms/{booking-id}/checkin")
    public Object checkin(@PathVariable(name = "booking-id") String id) {
        hotelService.checkin(UUID.fromString(id));
        return ResponseHelper.getResponse("checkin thanh cong", HttpStatus.OK);
    }

    @Operation(summary = "Get all bookings room ")
    @GetMapping("/rooms/bookings")
    public Object getBooking() {
        return ResponseHelper.getResponse(hotelService.getBooking(), HttpStatus.OK);
    }

    @Operation(summary = "Get all service ")
    @GetMapping("/services/")
    public Object getAllService() {
        List<ServiceModel> services = hotelService.getAllService();
        return ResponseHelper.getResponse(services, HttpStatus.OK);
    }

    @Operation(summary = "Create new service ")
    @PostMapping("/services/")
    public Object createService(@Valid @RequestBody ServiceCreateDTO dto,
                                BindingResult result) {
        if(result.hasErrors()) {
            return ResponseHelper.getErrorResponse(result, HttpStatus.BAD_REQUEST);
        }

        ServiceModel newRoom = hotelService.createService(dto);

        return ResponseHelper.getResponse(newRoom, HttpStatus.CREATED);
    }

    @Operation(summary = "Update service ")
    @PostMapping("/services/{service-id}")
    public Object updateService(@PathVariable(name = "service-id") String serviceID, @Valid @RequestBody ServiceCreateDTO dto,
                                BindingResult result) {
        if(result.hasErrors()) {
            return ResponseHelper.getErrorResponse(result, HttpStatus.BAD_REQUEST);
        }

        ServiceModel updateService = hotelService.updateService(UUID.fromString(serviceID), dto);

        if (updateService == null) {
            return ResponseHelper.getErrorResponse("Service is not existed", HttpStatus.BAD_REQUEST);
        }

        return ResponseHelper.getResponse(updateService, HttpStatus.OK);}

    @Operation(summary = "Inactive service ")
    @PostMapping("/services/{service-id}/in-active")
    public Object inactiveService(@PathVariable(name = "service-id") String serviceID) {
        ServiceModel updateService = hotelService.inactiveService(UUID.fromString(serviceID));

        if (updateService == null) {
            return ResponseHelper.getErrorResponse("Service is not existed", HttpStatus.BAD_REQUEST);
        }

        return ResponseHelper.getResponse(updateService, HttpStatus.OK);}

    @Operation(summary = "Active service ")
    @PostMapping("/services/{service-id}/active")
    public Object activeService(@PathVariable(name = "service-id") String serviceID) {
        ServiceModel updateService = hotelService.activeService(UUID.fromString(serviceID));

        if (updateService == null) {
            return ResponseHelper.getErrorResponse("Service is not existed", HttpStatus.BAD_REQUEST);
        }

        return ResponseHelper.getResponse(updateService, HttpStatus.OK);}

    @Operation(summary = "Order service ")
    @PostMapping("/services/{booking-id}/order")
    public Object orderService(@PathVariable(name = "booking-id") String bookingID, @Valid @RequestBody List<OrderServiceDTO> dtos,
                               BindingResult result) {
        if(result.hasErrors()) {
            return ResponseHelper.getErrorResponse(result, HttpStatus.BAD_REQUEST);
        }

        OrderServiceResponse res = hotelService.orderService(UUID.fromString(bookingID), dtos);

        if (res == null) {
            return ResponseHelper.getErrorResponse("Fail to order", HttpStatus.BAD_REQUEST);
        }

        return ResponseHelper.getResponse(res, HttpStatus.OK);}

    @Operation(summary = "Payment bill ")
    @GetMapping("/bills/{booking-id}")
    public Object getBill(@PathVariable(name = "booking-id") String bookingID) {

        InfoBillDTO res = hotelService.payment(UUID.fromString(bookingID));

        if (res == null) {
            return ResponseHelper.getErrorResponse("Fail to payment bill", HttpStatus.BAD_REQUEST);
        }

        return ResponseHelper.getResponse(res, HttpStatus.OK);}

    @Operation(summary = "Service stat ")
    @GetMapping("/stats/services")
    public Object getServiceStat() {
        return ResponseHelper.getResponse(hotelService.statService(), HttpStatus.OK);}

    @Operation(summary = "Rooms stat ")
    @GetMapping("/stats/rooms")
    public Object getRoomStat() {
        return ResponseHelper.getResponse(hotelService.statRoom(), HttpStatus.OK);}

    @Operation(summary = "Bills stat ")
    @GetMapping("/stats/bills")
    public Object getBillStat() {
        return ResponseHelper.getResponse(hotelService.statBill(), HttpStatus.OK);}

    @Operation(summary = "Get all user ")
    @GetMapping("/users")
    public Object getAllUser() {
        return ResponseHelper.getResponse(hotelService.getAllUser(), HttpStatus.OK);}

    @Operation(summary = "Get all client ")
    @GetMapping("/clients")
    public Object getAllClient() {
        return ResponseHelper.getResponse(hotelService.getAllClient(), HttpStatus.OK);}

    @Operation(summary = "active/inactive user")
    @GetMapping("/users/toggle")
    public Object toggleUser(String userId) {
        return ResponseHelper.getResponse(hotelService.actionUser(UUID.fromString(userId)), HttpStatus.OK);}

    @Operation(summary = "update user")
    @PutMapping("/users/{id}")
    public Object updateUser(@PathVariable String id, @RequestBody UserUpdateDTO dto) {
        UserModel user = hotelService.updateUser(UUID.fromString(id), dto);
        if (user == null) {
            return ResponseHelper.getErrorResponse("Fail to update user", HttpStatus.BAD_REQUEST);
        }
        return ResponseHelper.getResponse(user, HttpStatus.OK);}
}
