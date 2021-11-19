# Laziness is the power of progress

## Get Started

### Requirements
1. Docker
2. Heroku CLI with set-up configuration

### Install
```bash
# Clone the repository and change the working directory
git clone https://github.com/ggary9424/greatday-auto-clock-in.git
cd greatday-auto-clock-in

# Create a heroku app for the repository
heroku create $YOUR_APP_NAME

# Set environment variables
heroku config:set AUTHORIZATION=fake_authorization
heroku config:set COMPANY_ID=fake_company_id
heroku config:set EMPLOYEE_ID=fake_employee_id

# Build and deploy
heroku container:push web
heroku container:release web
heroku open

# Add the scheduler addon
heroku addons:create scheduler:standard

# Add the GUI of the scheduler configuration
heroku addons:open scheduler

# Configure your clock-in time on Heroku GUI...
```

### Debug
#### Test Clock-In Job
```bash
heroku run sh clock_in_out.sh
```

#### See All APPs Logs
```bash
heroku logs --tail
```

#### Get Environment Variables of APPs
```bash
heroku config:get $ENV_NAME
```