<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;

class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function getIPAddresses($network) { 
        // Execute the arp-scan command 
        $command = "arp -a"; 
        $output = []; 
        $returnVar = 0; 
     
        // Execute the command and capture the output 
        exec($command, $output, $returnVar); 
     
        // Check if the command was successful 
        if ($returnVar !== 0) { 
            echo "Error executing command."; 
            return []; 
        } 
     
        // Parse the output to extract IP addresses 
        $ipAddresses = []; 
        foreach ($output as $line) { 
            if (preg_match('/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/', $line, $matches)) { 
                $ipAddresses[] = $matches[1]; 
            } 
        } 
     
        return $ipAddresses; 
    } 


    public function getDevices()
    {

        
        $ip = getHostByName(getHostName()); // Gets the machine's local IP
        $hostname = gethostname(); // Retrieves the PC's hostname
        $status = exec("ping -n 1 google.com") ? 'online' : 'offline';

        $network = "192.168.1.0/24"; // Change this to your network range 
        $ips = $this->getIPAddresses($network); 
        echo "IP Addresses in the network:\n"; 
        print_r($ips); 

        return response()->json([
            'ip' => $ip,
            'hostname' => $hostname,
            'status' => $status
        ]);
        //return Device::where('ip', $ip)->first();

        //return Device::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Device::create($request->validate([
            'ip' => 'required|ip',
            'hostname' => 'required|string',
            'status' => 'required|in:online,offline'
          ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
