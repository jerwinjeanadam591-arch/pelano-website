# DNS Configuration Guide for Duhosting - pelanoresources.co.tz

## Step-by-Step DNS Setup

### STEP 1: Access Your Duhosting Control Panel

1. Go to: https://www.duhosting.com
2. Login with your email and password
3. Click on **"My Services"** or **"Manage Services"**
4. Find your domain **"pelanoresources.co.tz"**
5. Click on it to access domain settings

---

### STEP 2: Locate DNS Management

Once in your domain settings:

1. Look for **"DNS Management"** or **"Manage DNS"**
2. You might also see:
   - "Nameservers"
   - "DNS Records"
   - "DNS Settings"
3. Click on the DNS Management option

---

### STEP 3: DNS Configuration Options

You have TWO options:

#### **OPTION A: Use Duhosting Nameservers (Easiest)** ✅ RECOMMENDED

If your domain is already pointing to Duhosting's nameservers:

1. In Duhosting panel, find the DNS Records section
2. You should see a list of existing DNS records
3. Look for or create an **A Record**:
   - **Type:** A
   - **Name:** @ (or leave blank)
   - **Value:** Your hosting provider's IP address
   - **TTL:** 3600 (or default)

4. Also add a **CNAME Record** for www:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** pelanoresources.co.tz (or your hosting IP)
   - **TTL:** 3600

#### **OPTION B: Point to External Hosting Nameservers**

If your hosting is on a different server:

1. Get your hosting provider's **nameservers**:
   - Usually look like: ns1.hostingprovider.com
   - You might have 2-4 nameservers

2. In Duhosting control panel:
   - Find **"Change Nameservers"** or **"Update Nameservers"**
   - Replace the current nameservers with your hosting provider's
   - Save the changes

---

### STEP 4: Common DNS Records to Configure

If using Duhosting's nameservers, you need these records:

```
Type    Name    Value                           TTL
─────────────────────────────────────────────────────
A       @       Your_Hosting_IP_Address        3600
CNAME   www     pelanoresources.co.tz           3600
MX      @       mail.pelanoresources.co.tz     3600
TXT     @       v=spf1 include:_spf.domain     3600
```

**What each does:**
- **A Record:** Points your domain to your website's IP
- **CNAME:** Makes www.pelanoresources.co.tz work
- **MX Record:** (Optional) For email routing
- **TXT Record:** (Optional) For SPF/security

---

### STEP 5: How to Find Your Hosting IP Address

Ask your hosting provider for:
- The **server IP address** or **A record value**
- They'll provide something like: `123.45.67.89`

---

### STEP 6: Add the DNS Records in Duhosting

1. In the DNS Management section, click **"Add Record"** or **"Add DNS Record"**

2. **First Record - A Record (required):**
   ```
   Type: A
   Name: @ (or leave blank for root domain)
   Value: [Your hosting IP from Step 5]
   TTL: 3600
   ```
   Click **Save**

3. **Second Record - CNAME for www (important):**
   ```
   Type: CNAME
   Name: www
   Value: pelanoresources.co.tz
   TTL: 3600
   ```
   Click **Save**

4. **Optional - MX Record for email:**
   ```
   Type: MX
   Name: @ (leave blank)
   Value: mail.pelanoresources.co.tz
   Priority: 10
   TTL: 3600
   ```

---

### STEP 7: Verify DNS Configuration

After making changes:

1. Wait **15-60 minutes** for DNS to propagate
2. Use these tools to check:

   **Option A: Online DNS Checker**
   - Go to: https://www.whatsmydns.net
   - Enter: pelanoresources.co.tz
   - Should show your hosting IP address

   **Option B: Command Line (if using terminal)**
   ```bash
   nslookup pelanoresources.co.tz
   dig pelanoresources.co.tz
   host pelanoresources.co.tz
   ```

3. **What to look for:**
   - A record pointing to your hosting IP
   - CNAME record for www pointing to domain
   - Green checkmarks on whatsmydns.net

---

### STEP 8: Test Your Website

Once DNS is verified:

1. Open browser: https://pelanoresources.co.tz
2. Should load your website
3. Also test: https://www.pelanoresources.co.tz
4. Try: http://pelanoresources.co.tz (should redirect to https)

---

### TROUBLESHOOTING

**Issue: Domain not resolving after 1 hour**
- Solution: Check DNS records are saved correctly
- Clear browser cache and try from different network
- Try: https://www.whatsmydns.net to verify propagation

**Issue: www subdomain not working**
- Solution: Make sure CNAME record is added for "www"
- Value should be: pelanoresources.co.tz

**Issue: HTTPS not working**
- Solution: Make sure your hosting has SSL certificate installed
- Usually automatic on modern hosting

**Issue: Old website still showing**
- Solution: DNS cache issue
- Clear browser cache
- Try different browser or incognito mode
- Wait 24 hours for full propagation

---

### DUHOSTING INTERFACE LOCATION SUMMARY

```
Login to Duhosting
    ↓
Click "My Services" / "My Domains"
    ↓
Find "pelanoresources.co.tz"
    ↓
Click on the domain
    ↓
Look for "DNS" section or "Manage DNS"
    ↓
Click to edit DNS records
    ↓
Add A and CNAME records as shown above
    ↓
Save changes
    ↓
Wait 15-60 minutes
    ↓
Verify using whatsmydns.net
    ↓
Test website loads correctly
```

---

### IMPORTANT NOTES

⚠️ **Before You Start:**
- Make sure your hosting provider is ready
- Have your hosting IP address handy
- DNS changes can take 15 minutes to 24 hours to fully propagate
- Don't panic if it's not instant - that's normal!

✅ **Do This:**
- Save your DNS records in a document
- Note the TTL values
- Take screenshots of configuration
- Test both domain and www.domain

❌ **Don't Do This:**
- Don't delete all DNS records (might break everything)
- Don't change nameservers mid-deployment
- Don't expect instant results (give it time)

---

### QUICK CHECKLIST

- [ ] Login to Duhosting account
- [ ] Find domain "pelanoresources.co.tz"
- [ ] Access DNS Management
- [ ] Get hosting provider IP address
- [ ] Add A record (@ → hosting IP)
- [ ] Add CNAME record (www → pelanoresources.co.tz)
- [ ] Save all changes
- [ ] Wait 15-60 minutes
- [ ] Verify DNS with whatsmydns.net
- [ ] Test website loads
- [ ] Test www.pelanoresources.co.tz loads
- [ ] Done! 🚀

