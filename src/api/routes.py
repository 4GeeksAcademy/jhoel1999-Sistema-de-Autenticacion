"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = data.get("password")

        if not all([first_name, last_name, email, password]):
            return jsonify({"msg": "All fields are required"}), 400
        
        registered_user = User.query.filter_by(email=email).first()
        if registered_user:
            return jsonify({"Error":"Email already exists"}), 409
        
        encrypted_password = bcrypt.generate_password_hash(password).decode("utf-8")

        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=encrypted_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg":"User successfully registered", "ok":True}), 201 

    except Exception as error:
        return jsonify({"Error": "Something went wrong: " + str(error)}), 500

@api.route('/login', methods=['POST'])
def authenticate_user():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not all([email, password]):
            return jsonify({"msg": "Email and password are required"}), 400
        
        found_user = User.query.filter_by(email=email).one()

        if not found_user:
            return jsonify({"msg": "There is no user with this email registered"})
        
        encrypted_password = found_user.password
        is_password_valid = bcrypt.check_password_hash(encrypted_password, password)

        if is_password_valid:
            user_identifier = found_user.id
            jwt_access_token = create_access_token(identity=user_identifier)
            return jsonify({
                "access_token": jwt_access_token,
                "first_name":found_user.first_name,
                "email":found_user.email
            }), 200
        else:
            return jsonify({"Error": "incorrect password"})
        
    except Exception as error:
        return jsonify({"Error": "Something went wrong: " + str(error)}), 500
    

@api.route('/users')
@jwt_required()
def show_users():
    try:
        logged_in_user_id = get_jwt_identity()
        if logged_in_user_id:
            all_users = User.query.all()
            user_list = []
            
            for user in all_users:
                user_list.append(user.serialize())
                
            return jsonify({"User_list": user_list}), 200
        else:
            return jsonify({"Error": "is invalid or expired"})
            
    except Exception as error:
        return jsonify({"Error": f"An error occurred: {str(error)}"}), 500