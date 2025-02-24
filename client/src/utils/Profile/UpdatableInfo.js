const updateProfile = {
    Address : {
        fullName: {
            type: "text",
            name: "fullName",
            label: "Full Name",
          },
          phoneNumber: {
            type: "number",
            name: "phoneNumber",
            label: "Phone Number",
          },
          address: {
            type: "text",
            name: "address",
            label: "Address",
          },
          city: {
            type: "text",
            name: "city",
            label: "City",
          },
          state: {
            type: "text",
            name: "state",
            label: "State",
          },
          pincode: {
            type: "number",
            name: "pincode",
            label: "Pincode",
          },
    },

    Account : {
        bankName : {
            type : "text",
            name : "bankName",
          },
          accountName : {
            type : "text",
            name : "accountName",
          },
          accountNumber : {
            type : "text",
            name : "accountNumber",
          },
    }
}

export default updateProfile;