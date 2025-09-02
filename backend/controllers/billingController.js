const { z } = require('zod');

// Zod schemas for validation
const brandBillingSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode format")
  }),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number format"),
  budget: z.number().positive("Budget must be positive"),
  paymentMethod: z.enum(["Credit Card", "Bank Transfer", "UPI", "Cheque"], {
    errorMap: () => ({ message: "Invalid payment method" })
  })
});

const creatorPayoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  upi: z.string().regex(/^[\w.-_]{2,256}@[a-zA-Z]{2,64}$/, "Invalid UPI ID format"),
  bankAccount: z.object({
    accountNumber: z.string().regex(/^\d{9,18}$/, "Invalid account number"),
    ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
    bankName: z.string().min(1, "Bank name is required"),
    accountHolderName: z.string().min(1, "Account holder name is required")
  }),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode format")
  })
});

/**
 * Handle brand billing details submission
 */
const submitBrandBilling = async (req, res) => {
  try {
    const validatedData = brandBillingSchema.parse(req.body);
    
    // Calculate GST (18%)
    const gstAmount = validatedData.budget * 0.18;
    const totalAmount = validatedData.budget + gstAmount;
    
    const summary = {
      ...validatedData,
      gst: {
        rate: 18,
        amount: gstAmount,
        total: totalAmount
      },
      submittedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: "Brand billing details validated successfully",
      summary
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        issues: error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      });
    }
    
    console.error('Error in submitBrandBilling:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

/**
 * Handle creator payout details submission
 */
const submitCreatorPayout = async (req, res) => {
  try {
    const validatedData = creatorPayoutSchema.parse(req.body);
    
    res.json({
      success: true,
      message: "Creator payout details validated successfully",
      data: {
        ...validatedData,
        submittedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        issues: error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      });
    }
    
    console.error('Error in submitCreatorPayout:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

module.exports = {
  submitBrandBilling,
  submitCreatorPayout,
  brandBillingSchema,
  creatorPayoutSchema
};
